'use client';

import { useActionState } from 'react';
import type { MeetingFormState } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingFormProps {
  action: (state: MeetingFormState, formData: FormData) => Promise<MeetingFormState>;
  meeting?: SacramentMeeting;
  submitLabel: string;
}

const initialState: MeetingFormState = { message: null, errors: {} };

function formatWardBusiness(meeting?: SacramentMeeting) {
  return meeting?.wardBusiness.map((item) => item.description).join('\n') ?? '';
}

function formatSpeakers(meeting?: SacramentMeeting) {
  return meeting?.speakers.map((s) => `${s.name} | ${s.topic} | ${s.type}`).join('\n') ?? '';
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" className="text-red-700 text-sm mt-1">
      {errors?.map((err) => (
        <p key={err}>{err}</p>
      ))}
    </div>
  );
}

export default function MeetingForm({ action, meeting, submitLabel }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.message && (
        <p className="text-red-700 font-semibold" role="alert">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="date" className="block font-medium text-gray-900 mb-1">Date</label>
        <input
          id="date" name="date" type="date"
          defaultValue={meeting?.date}
          aria-describedby="date-error"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        />
        <FieldError id="date-error" errors={state.errors?.date} />
      </div>

      <div>
        <label htmlFor="meetingType" className="block font-medium text-gray-900 mb-1">Meeting Type</label>
        <select
          id="meetingType" name="meetingType"
          defaultValue={meeting?.meetingType ?? 'regular'}
          aria-describedby="meetingType-error"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        >
          <option value="regular">Regular Sacrament Meeting</option>
          <option value="testimony">Fast &amp; Testimony Meeting</option>
          <option value="stake">Stake Meeting</option>
          <option value="general">General Conference</option>
        </select>
        <FieldError id="meetingType-error" errors={state.errors?.meetingType} />
      </div>

      <div>
        <label htmlFor="presiding" className="block font-medium text-gray-900 mb-1">Presiding</label>
        <input
          id="presiding" name="presiding" type="text"
          defaultValue={meeting?.presiding}
          aria-describedby="presiding-error"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        />
        <FieldError id="presiding-error" errors={state.errors?.presiding} />
      </div>

      <div>
        <label htmlFor="conducting" className="block font-medium text-gray-900 mb-1">Conducting</label>
        <input
          id="conducting" name="conducting" type="text"
          defaultValue={meeting?.conducting}
          aria-describedby="conducting-error"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        />
        <FieldError id="conducting-error" errors={state.errors?.conducting} />
      </div>

      <div>
        <label htmlFor="announcements" className="block font-medium text-gray-900 mb-1">
          Announcements <span className="font-normal text-gray-500">(one per line, optional)</span>
        </label>
        <textarea
          id="announcements" name="announcements" rows={3}
          defaultValue={meeting?.announcements?.join('\n')}
          aria-describedby="announcements-error"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        />
        <FieldError id="announcements-error" errors={state.errors?.announcements} />
      </div>

      <fieldset className="border border-gray-300 rounded p-4">
        <legend className="font-medium text-gray-900 px-1">Opening Hymn</legend>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <label htmlFor="openingHymnNumber" className="block text-sm text-gray-700 mb-1">Number</label>
            <input
              id="openingHymnNumber" name="openingHymnNumber" type="number"
              defaultValue={meeting?.openingHymn.number}
              aria-describedby="openingHymnNumber-error"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="openingHymnTitle" className="block text-sm text-gray-700 mb-1">Title</label>
            <input
              id="openingHymnTitle" name="openingHymnTitle" type="text"
              defaultValue={meeting?.openingHymn.title}
              aria-describedby="openingHymnTitle-error"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
            />
          </div>
        </div>
        <FieldError id="openingHymnNumber-error" errors={state.errors?.openingHymnNumber} />
        <FieldError id="openingHymnTitle-error" errors={state.errors?.openingHymnTitle} />
      </fieldset>

      <div>
        <label htmlFor="openingPrayer" className="block font-medium text-gray-900 mb-1">Opening Prayer</label>
        <input
          id="openingPrayer" name="openingPrayer" type="text"
          defaultValue={meeting?.openingPrayer}
          aria-describedby="openingPrayer-error"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        />
        <FieldError id="openingPrayer-error" errors={state.errors?.openingPrayer} />
      </div>

      <div>
        <label htmlFor="wardBusiness" className="block font-medium text-gray-900 mb-1">
          Ward Business <span className="font-normal text-gray-500">(one item per line, optional)</span>
        </label>
        <textarea
          id="wardBusiness" name="wardBusiness" rows={3}
          defaultValue={formatWardBusiness(meeting)}
          aria-describedby="wardBusiness-error"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        />
        <FieldError id="wardBusiness-error" errors={state.errors?.wardBusiness} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="stakeBusiness" name="stakeBusiness" type="checkbox"
          defaultChecked={meeting?.stakeBusiness}
          aria-describedby="stakeBusiness-error"
          className="h-4 w-4"
        />
        <label htmlFor="stakeBusiness" className="text-gray-900">Includes stake business</label>
        <FieldError id="stakeBusiness-error" errors={state.errors?.stakeBusiness} />
      </div>

      <fieldset className="border border-gray-300 rounded p-4">
        <legend className="font-medium text-gray-900 px-1">Sacrament Hymn</legend>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <label htmlFor="sacramentHymnNumber" className="block text-sm text-gray-700 mb-1">Number</label>
            <input
              id="sacramentHymnNumber" name="sacramentHymnNumber" type="number"
              defaultValue={meeting?.sacramentHymn.number}
              aria-describedby="sacramentHymnNumber-error"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="sacramentHymnTitle" className="block text-sm text-gray-700 mb-1">Title</label>
            <input
              id="sacramentHymnTitle" name="sacramentHymnTitle" type="text"
              defaultValue={meeting?.sacramentHymn.title}
              aria-describedby="sacramentHymnTitle-error"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
            />
          </div>
        </div>
        <FieldError id="sacramentHymnNumber-error" errors={state.errors?.sacramentHymnNumber} />
        <FieldError id="sacramentHymnTitle-error" errors={state.errors?.sacramentHymnTitle} />
      </fieldset>

      <div>
        <label htmlFor="speakers" className="block font-medium text-gray-900 mb-1">
          Speakers &amp; Musical Numbers{' '}
          <span className="font-normal text-gray-500">
            (one per line: Name | Topic | speaker, or Name | | musical-number — optional)
          </span>
        </label>
        <textarea
          id="speakers" name="speakers" rows={3}
          defaultValue={formatSpeakers(meeting)}
          aria-describedby="speakers-error"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        />
        <FieldError id="speakers-error" errors={state.errors?.speakers} />
      </div>

      <fieldset className="border border-gray-300 rounded p-4">
        <legend className="font-medium text-gray-900 px-1">Closing Hymn</legend>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <label htmlFor="closingHymnNumber" className="block text-sm text-gray-700 mb-1">Number</label>
            <input
              id="closingHymnNumber" name="closingHymnNumber" type="number"
              defaultValue={meeting?.closingHymn.number}
              aria-describedby="closingHymnNumber-error"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="closingHymnTitle" className="block text-sm text-gray-700 mb-1">Title</label>
            <input
              id="closingHymnTitle" name="closingHymnTitle" type="text"
              defaultValue={meeting?.closingHymn.title}
              aria-describedby="closingHymnTitle-error"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
            />
          </div>
        </div>
        <FieldError id="closingHymnNumber-error" errors={state.errors?.closingHymnNumber} />
        <FieldError id="closingHymnTitle-error" errors={state.errors?.closingHymnTitle} />
      </fieldset>

      <div>
        <label htmlFor="closingPrayer" className="block font-medium text-gray-900 mb-1">Closing Prayer</label>
        <input
          id="closingPrayer" name="closingPrayer" type="text"
          defaultValue={meeting?.closingPrayer}
          aria-describedby="closingPrayer-error"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        />
        <FieldError id="closingPrayer-error" errors={state.errors?.closingPrayer} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isPending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}