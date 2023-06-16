"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import AppwriteConfig from "../constants/appwrite_config";
import { useRouter } from "next/navigation";
import { PhotoIcon } from "@heroicons/react/24/solid";

const CreateEventPage = () => {
  const [eventname, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [hostname, setHostName] = useState("");
  const [eventdate, setEventDate] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("India");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const [audience, setAudience] = useState("Developers");
  const [type, setType] = useState("In Person");
  const [attendees, setAttendees] = useState(0);
  const [price, setPrice] = useState(0);
  const [tech, setTech] = useState("Yes");
  const [agenda, setAgenda] = useState("");
  const [sponsor1, setSponsor1] = useState("");
  const [sponsor2, setSponsor2] = useState("");
  const [sponsor3, setSponsor3] = useState("");
  const [approval, setApproval] = useState("");

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const appwriteConfig = new AppwriteConfig();

    appwriteConfig
      .createEvent(
        eventname,
        description,
        banner || new File([], ""),
        hostname,
        eventdate,
        email,
        country,
        address,
        city,
        state,
        postal,
        audience,
        type,
        attendees,
        price,
        tech,
        agenda,
        sponsor1,
        sponsor2,
        sponsor3,
        approval,
      )
      .then((res) => {
        if (res == "sucess") {
          router.push("/events");
        } else {
          // show error dialog
          console.log(res);
        }
      });
  };

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBanner(file);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl text-[#DB195A] font-bold mb-4 my-5">
        Create Event
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 ">
                <label
                  htmlFor="eventname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Event Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="eventname"
                    id="eventname"
                    value={eventname}
                    onChange={(e) => setEventName(e.target.value)}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about your event.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="banner"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Banner photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="col-span-2">
                      <label
                        htmlFor="banner"
                        className="text-gray-700 font-semibold"
                      >
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
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Event Contact
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Give some contact information about your awesome event
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="hostname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Host Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="hostname"
                    id="hostname"
                    value={hostname}
                    onChange={(e) => setHostName(e.target.value)}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="eventdate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Event Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="eventdate"
                    id="eventdate"
                    value={eventdate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal"
                    id="postal"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Event Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Give some specific information about your awesome event
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="audience"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Target Audience
                </label>
                <div className="mt-2">
                  <select
                    id="audience"
                    name="audience"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Developers</option>
                    <option>Designers</option>
                    <option>Developer Advocate</option>
                    <option>C Level Executives</option>
                    <option>Everyone</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Event Type
                </label>
                <div className="mt-2">
                  <select
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>In Person</option>
                    <option>Virtual</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="attendees"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Expected Number of Audience
                </label>
                <div className="mt-2">
                  <input
                    id="attendees"
                    name="attendees"
                    type="number"
                    value={attendees}
                    onChange={(e) => setAttendees(Number(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ticket Price (Enter 0 if free)
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="tech"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tech Focused
                </label>
                <div className="mt-2">
                  <select
                    id="tech"
                    name="tech"
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Yes</option>
                    <option>No</option>
                    <option>Not sure</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="agenda"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Agenda
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="agenda"
                    id="agenda"
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Enter Upto 3 Sponsors Name
                </p>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="sponsor1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sponsor 1
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="sponsor1"
                    id="sponsor1"
                    value={sponsor1}
                    onChange={(e) => setSponsor1(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="sponsor2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sponsor 2
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="sponsor2"
                    id="sponsor2"
                    value={sponsor2}
                    onChange={(e) => setSponsor2(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="sponsor3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sponsor 3
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="sponsor3"
                    id="sponsor3"
                    value={sponsor3}
                    onChange={(e) => setSponsor3(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Requires Approval
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Will participants need approval fromm your side to attend
                  event after registration?
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="yes"
                      name="approval"
                      type="radio"
                      value="Yes"
                      onChange={(e) => setApproval(e.target.value)}
                      className="h-4 w-4 border-gray-300 text-[#DB195A] focus:ring-[#DB195A]"
                    />
                    <label
                      htmlFor="yes"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="no"
                      name="approval"
                      type="radio"
                      value="No"
                      onChange={(e) => setApproval(e.target.value)}
                      className="h-4 w-4 border-gray-300 text-[#DB195A] focus:ring-[#DB195A]"
                    />
                    <label
                      htmlFor="no"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6 py-5">
          <button
            type="submit"
            className="rounded-md bg-[#DB195A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#DB195A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DB195A]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
