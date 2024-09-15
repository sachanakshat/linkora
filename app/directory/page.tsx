export default function Directory() {
    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080?nature')" }}>
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-serif mb-4 text-center">Directory</h1>
                <div className="flex flex-col items-center justify-center space-y-6 p-4 md:p-0">
                    <div className="text-center">
                        <h2 className="font-serif text-3xl">Welcome to LINKORA</h2>
                        <p className="font-sans text-xl">Experience a new way to connect</p>
                    </div>
                </div>
            </div>
        </div>
    );
}