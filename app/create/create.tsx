'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import AppwriteConfig from '../constants/appwrite_config';

interface EventDetails {
    eventName: string;
    eventDate: Date;
    shortDescription: string;
    eventOutcome: string;
    techFocused: string;
    targetAudience: 'Student' | 'Working Proffesionals' | 'Everyone';
    attendees: number;
    ticketPrice: number,
    venue: 'InPerson' | 'Virtual';
    talksSpeakers: string[];
    sponsors: [];
    approvalRequired: boolean;
    banner: File | null;
}

const CreateEventPage = () => {
    const [eventDetails, setEventDetails] = useState<EventDetails>({
        eventName: '',
        eventDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
        shortDescription: '',
        eventOutcome: '',
        techFocused: '',
        targetAudience: 'Student',
        attendees: 0,
        ticketPrice: 0,
        venue: 'InPerson',
        talksSpeakers: [],
        sponsors: [],
        approvalRequired: false,
        banner: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'banner' && e.target instanceof HTMLInputElement && e.target.files && e.target.files.length > 0) {
            // Handle file selection for banner field
            setEventDetails((prevDetails) => ({
                ...prevDetails,
                [name]: e.target.files[0],
            }));
        } else {
            // Handle other field changes
            setEventDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        }
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            [name]: checked,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission, e.g., send eventDetails to the server
        const appwriteConfig = new AppwriteConfig();
        appwriteConfig.createEvent(eventDetails.eventName, eventDetails.eventDate, eventDetails.shortDescription, eventDetails.eventOutcome, eventDetails.techFocused, eventDetails.targetAudience, eventDetails.attendees, eventDetails.ticketPrice, eventDetails.venue, eventDetails.talksSpeakers, eventDetails.sponsors, eventDetails.approvalRequired);
        // Reset form fields
        setEventDetails({
            eventName: '',
            eventDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
            shortDescription: '',
            eventOutcome: '',
            techFocused: '',
            targetAudience: 'Student',
            attendees: 0,
            ticketPrice: 0,
            venue: 'InPerson',
            talksSpeakers: [],
            sponsors: [],
            approvalRequired: false,
            banner: null,
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-[#DB195A]">Create Event</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="eventName" className="block mb-2 font-medium text-black">
                        Event Name
                    </label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={eventDetails.eventName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="eventDate" className="block mb-2 font-medium text-black">
                        Event Date
                    </label>
                    <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={eventDetails.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="shortDescription" className="block mb-2 font-medium text-black">
                        Short Description
                    </label>
                    <textarea
                        id="shortDescription"
                        name="shortDescription"
                        value={eventDetails.shortDescription}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="eventOutcome" className="block mb-2 font-medium text-black">
                        Event Outcome
                    </label>
                    <textarea
                        id="eventOutcome"
                        name="eventOutcome"
                        value={eventDetails.eventOutcome}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="techFocused" className="block mb-2 font-medium text-black">
                        Tech Focused (Name of techs)
                    </label>
                    <input
                        type="text"
                        id="techFocused"
                        name="techFocused"
                        value={eventDetails.techFocused}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="target" className="block mb-2 font-medium text-black">
                        Target Audience
                    </label>
                    <select
                        id="targetAudience"
                        name="targetAudience"
                        value={eventDetails.targetAudience}
                        onChange={() => handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    >
                        <option value="InPerson">Student</option>
                        <option value="Working">Working professionals</option>
                        <option value="Both">Everyone</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="attendees" className="block mb-2 font-medium text-black">
                        Expected Number of Attendees
                    </label>
                    <input
                        type="number"
                        id="attendees"
                        name="attendees"
                        value={eventDetails.attendees}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="ticketPrice" className="block mb-2 font-medium text-black">
                        Ticket Price (If Any. Type 0 if free)
                    </label>
                    <input
                        type="text"
                        id="ticketPrice"
                        name="ticketPrice"
                        value={eventDetails.ticketPrice || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="venue" className="block mb-2 font-medium text-black">
                        Venue (InPerson - Virtual)
                    </label>
                    <select
                        id="venue"
                        name="venue"
                        value={eventDetails.venue}
                        onChange={() => handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    >
                        <option value="InPerson">In Person</option>
                        <option value="Virtual">Virtual</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="talksSpeakers" className="block mb-2 font-medium text-black">
                        Talks / Speakers
                    </label>
                    <textarea
                        id="talksSpeakers"
                        name="talksSpeakers"
                        value={eventDetails.talksSpeakers}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="sponsors" className="block mb-2 font-medium text-black">
                        Sponsors (If any)
                    </label>
                    <input
                        type="text"
                        id="sponsors"
                        name="sponsors"
                        value={eventDetails.sponsors || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="approvalRequired" className="block mb-2 font-medium text-black">
                        Requires Approval to Attend (Y / N)
                    </label>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="approvalRequiredYes"
                            name="approvalRequired"
                            value="Yes"
                            checked={eventDetails.approvalRequired}
                            onChange={handleChange}
                            className="mr-2 text-white"
                        />
                        <label htmlFor="approvalRequiredYes" className="mr-4 text-grey-900">
                            Yes
                        </label>
                        <input
                            type="radio"
                            id="approvalRequiredNo"
                            name="approvalRequired"
                            value="No"
                            checked={!eventDetails.approvalRequired}
                            onChange={handleChange}
                            className="mr-2 text-white"
                        />
                        <label htmlFor="approvalRequiredNo" className="text-grey-900">
                            No
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="banner" className="block mb-2 font-medium text-black">
                        Banner of Event
                    </label>
                    <input
                        type="file"
                        id="banner"
                        name="banner"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-grey-800 rounded-md focus:outline-none focus:border-black"
                    />
                </div>


                <button
                    type="submit"
                    className="w-full bg-[#DB195A] hover:bg-DB195A text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
                >
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEventPage;
