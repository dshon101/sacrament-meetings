'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from '@/lib/meetings-db';
import type { SpeakerItem } from '@/lib/types';

const MeetingFormSchema = z.object({
  date: z.string().min(1, { message: 'Date is required.' }),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], {
    message: 'Select a valid meeting type.',
  }),
  presiding: z.string().trim().min(1, { message: 'Presiding officer is required.' }),
  conducting: z.string().trim().min(1, { message: 'Conducting officer is required.' }),
  announcements: z.string().optional(),
  openingHymnNumber: z.coerce
    .number({ message: 'Opening hymn number must be a number.' })
    .int()
    .positive({ message: 'Opening hymn number must be positive.' }),
  openingHymnTitle: z.string().trim().min(1, { message: 'Opening hymn title is required.' }),
  openingPrayer: z.string().trim().min(1, { message: 'Opening prayer name is required.' }),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.coerce.boolean().optional(),
  sacramentHymnNumber: z.coerce
    .number({ message: 'Sacrament hymn number must be a number.' })
    .int()
    .positive({ message: 'Sacrament hymn number must be positive.' }),
  sacramentHymnTitle: z.string().trim().min(1, { message: 'Sacrament hymn title is required.' }),
  speakers: z.string().optional(),
  closingHymnNumber: z.coerce
    .number({ message: 'Closing hymn number must be a number.' })
    .int()
    .positive({ message: 'Closing hymn number must be positive.' }),
  closingHymnTitle: z.string().trim().min(1, { message: 'Closing hymn title is required.' }),
  closingPrayer: z.string().trim().min(1, { message: 'Closing prayer name is required.' }),
});

export type MeetingFormState = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

function parseLines(value?: string): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSpeakers(value?: string): SpeakerItem[] {
  return parseLines(value).map((line) => {
    const [name, topic = '', type = 'speaker'] = line
      .split('|')
      .map((part) => part.trim());
    return {
      name,
      topic,
      type: type === 'musical-number' ? 'musical-number' : 'speaker',
    };
  });
}

function buildMeetingData(fields: z.infer<typeof MeetingFormSchema>) {
  return {
    date: fields.date,
    meetingType: fields.meetingType,
    presiding: fields.presiding,
    conducting: fields.conducting,
    announcements: parseLines(fields.announcements),
    openingHymn: { number: fields.openingHymnNumber, title: fields.openingHymnTitle },
    openingPrayer: fields.openingPrayer,
    wardBusiness: parseLines(fields.wardBusiness).map((description) => ({ description })),
    stakeBusiness: Boolean(fields.stakeBusiness),
    sacramentHymn: { number: fields.sacramentHymnNumber, title: fields.sacramentHymnTitle },
    speakers: parseSpeakers(fields.speakers),
    closingHymn: { number: fields.closingHymnNumber, title: fields.closingHymnTitle },
    closingPrayer: fields.closingPrayer,
  };
}

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const validatedFields = MeetingFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create meeting.',
    };
  }

  try {
    await addMeeting(buildMeetingData(validatedFields.data));
  } catch (error) {
    console.error('createMeeting failed:', error);
    return { message: 'Failed to create meeting. Please try again.' };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const validatedFields = MeetingFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update meeting.',
    };
  }

  try {
    const updated = await updateMeetingInDb(id, buildMeetingData(validatedFields.data));
    if (!updated) {
      return { message: 'Meeting not found.' };
    }
  } catch (error) {
    console.error('updateMeeting failed:', error);
    return { message: 'Failed to update meeting. Please try again.' };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number, _formData?: FormData): Promise<void> {
  try {
    await deleteMeetingInDb(id);
  } catch (error) {
    console.error('deleteMeeting failed:', error);
    throw new Error('Failed to delete meeting. Please try again.');
  }
  revalidatePath('/meetings');
}