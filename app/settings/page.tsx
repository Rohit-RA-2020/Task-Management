import MyCustomFragment from "./my";

export default function Settings() {
    return (

        <div className="font-mono text-green-400 text-4xl text-center">
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl text-white">Tailblocks</span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <a className="mr-5 hover:text-gray-200">First Link</a>
                        <a className="mr-5 hover:text-gray-200">Second Link</a>
                        <a className="mr-5 hover:text-gray-200">Third Link</a>
                        <a className="mr-5 hover:text-gray-200">Fourth Link</a>
                    </nav>
                </div>
            </header>
            <MyCustomFragment />
        </div>
    )
}