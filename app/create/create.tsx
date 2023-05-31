"use client";

import { useState } from 'react';

interface EventFormData {
  title: string;
  date: Date;
  location: string;
  description: string;
}

const CreateEventForm: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: new Date(),
    location: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'date' ? new Date(value) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle form submission here, for example, send the data to a server
    console.log(formData);
    // Reset form data
    setFormData({
      title: '',
      date: new Date(),
      location: '',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-gray-900">Create Event</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border-gray-300 border py-2 px-3 rounded-md focus:outline-none focus:border-indigo-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-semibold mb-1">Date:</label>
        <input type="date" id="date" name="date" value={formData.date.toISOString().substr(0, 10)} onChange={handleChange} className="w-full border-gray-300 border py-2 px-3 rounded-md focus:outline-none focus:border-indigo-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 font-semibold mb-1">Location:</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full border-gray-300 border py-2 px-3 rounded-md focus:outline-none focus:border-indigo-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border-gray-300 border py-2 px-3 rounded-md focus:outline-none focus:border-indigo-500" />
      </div>
      <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;
