export default function Event({ params }: { params: { event: string } }) {
  console.log(params["event"]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-red-500 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold text-center text-white">Event Details</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="/path/to/event-image.jpg"
            alt="Event Image"
            className="w-full h-64 object-cover object-center"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Title</h2>
            <div className="flex flex-wrap mb-4">
              <div className="w-full sm:w-1/2">
                <p className="text-gray-600">
                  <span className="font-semibold">Date:</span> June 15, 2023
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Time:</span> 7:00 PM - 9:00 PM
                </p>
              </div>
              <div className="w-full sm:w-1/2">
                <p className="text-gray-600">
                  <span className="font-semibold">Venue:</span> Event Venue
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Audience:</span> General
                </p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Event Description</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan
                vestibulum sagittis. Nunc ut faucibus sem, id pharetra mi. Sed vitae hendrerit
                tortor. Sed id ligula metus. In quis egestas mauris, vitae tincidunt quam.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Speakers</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Speaker 1</li>
                <li>Speaker 2</li>
                <li>Speaker 3</li>
              </ul>
            </div>
            <div className="text-center">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Register
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
