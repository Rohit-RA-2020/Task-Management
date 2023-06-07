"use client";

import { ChangeEvent, FormEvent, useState } from 'react';
import AppwriteConfig from '../constants/appwrite_config';
import { useRouter } from 'next/navigation';

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [techFocused, setTechFocused] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [numAttendees, setNumAttendees] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [venue, setVenue] = useState('');
  const [talksSpeakers, setTalksSpeakers] = useState('');
  const [sponsors, setSponsors] = useState('');
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [banner, setBanner] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const appwriteConfig = new AppwriteConfig();

    appwriteConfig.createEvent(eventName, eventDate, techFocused, numAttendees, ticketPrice, venue, talksSpeakers, sponsors, requiresApproval, shortDescription, targetAudience, banner || new File([], ''));
    router.push('/events');

  };

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBanner(file);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl text-[#DB195A] font-bold mb-4">Create Event</h2>

      <form onSubmit={handleSubmit} className="w-full ">
        <div className="flex flex-col sm:flex-row  gap-2">
          <div className=" w-full sm:w-1/2">
            <label htmlFor="eventName" className="text-gray-700 font-semibold">
              Event Name:
            </label>
            <input
              id="eventName"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="border-2 rounded-md w-full px-3 py-2 mt-1"
            />
          </div>

          <div className='w-full sm:w-1/2'>
            <label htmlFor="eventDate" className="text-gray-700 font-semibold">
              Event Date:
            </label>
            <input
              type="date"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="border-2 rounded-md w-full px-3 py-2 mt-1"
            />
          </div>

        </div>

        <div>
          <label
            htmlFor="shortDescription"
            className="text-gray-700 font-semibold"
          >
            Short Description (Event Outcome):
          </label>
          <input
            id="shortDescription"
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="border-2 rounded-md w-full px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="techFocused" className="text-gray-700 font-semibold">
            Tech Focused (Name of Techs):
          </label>
          <input
            id="techFocused"
            type="text"
            value={techFocused}
            onChange={(e) => setTechFocused(e.target.value)}
            className="border-2 rounded-md w-full px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="targetAudience"
            className="text-gray-700 font-semibold"
          >
            Target Audience:
          </label>
          <select
            id="targetAudience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="border-2 rounded-md w-full px-3 py-2 mt-1"
          >
            <option value="">Select an option</option>
            <option value="Developers">Developers</option>
            <option value="Designers">Designers</option>
            <option value="Marketers">Marketers</option>
            <option value="Business Owners">Business Owners</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="numAttendees"
            className="text-gray-700 font-semibold"
          >
            Number of Attendees:
          </label>
          <input
            id="numAttendees"
            type="number"
            value={numAttendees}
            onChange={(e) => setNumAttendees(Number(e.target.value))}
            className="border-2 rounded-md w-full px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="ticketPrice" className="text-gray-700 font-semibold">
            Ticket Price (If Any):
          </label>
          <input
            id="ticketPrice"
            type="number"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(Number(e.target.value))}
            className="border-2 rounded-md w-full px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="venue" className="text-gray-700 font-semibold">
            Venue (InPerson / Virtual):
          </label>
          <select
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="border-2 rounded-md w-full px-3 py-2 mt-1"
          >
            <option value="">Select an option</option>
            <option value="InPerson">In Person</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="talksSpeakers"
            className="text-gray-700 font-semibold"
          >
            Talks / Speakers:
          </label>
          <input
            id="talksSpeakers"
            type="text"
            value={talksSpeakers}
            onChange={(e) => setTalksSpeakers(e.target.value)}
            className="border-2 rounded-md w-full px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label htmlFor="sponsors" className="text-gray-700 font-semibold">
            Sponsors (If any):
          </label>
          <input
            id="sponsors"
            type="text"
            value={sponsors}
            onChange={(e) => setSponsors(e.target.value)}
            className="border-2 rounded-md w-full px-3 py-2 mt-1"
          />
        </div>

        <div className="col-span-2 flex items-center">
          <input
            id="requiresApproval"
            type="checkbox"
            checked={requiresApproval}
            onChange={(e) => setRequiresApproval(e.target.checked)}
            className="mr-2"
          />
          <label
            htmlFor="requiresApproval"
            className="text-gray-700 font-semibold"
          >
            Requires Approval to Attend
          </label>
        </div>

        <div className="col-span-2">
          <label htmlFor="banner" className="text-gray-700 font-semibold">
            Banner of Event:
          </label>
          <input
            id="banner"
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="border-2 rounded-md w-full px-3 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 mt-4 rounded-md col-span-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventForm;

