'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface EventDetails {
    title: string;
    date: string;
    location: string;
    description: string;
}

const CreateEventPage = () => {
    const [eventDetails, setEventDetails] = useState<EventDetails>({
        title: '',
        date: '',
        location: '',
        description: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission, e.g., send eventDetails to the server
        console.log(eventDetails);
        // Reset form fields
        setEventDetails({
            title: '',
            date: '',
            location: '',
            description: '',
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Create Event</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 font-medium text-gray-800">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={eventDetails.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block mb-2 font-medium text-gray-800">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={eventDetails.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="location" className="block mb-2 font-medium text-gray-800">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={eventDetails.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 font-medium text-gray-800">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={eventDetails.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
                >
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEventPage;
