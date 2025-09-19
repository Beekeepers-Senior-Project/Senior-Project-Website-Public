import landingPhoto from '../assets/landing-photo.webp';

function Landing() {
    return (
        <div className="div text-foreground">
            <div className="container">
                <div className="text-center pt-3">
                    <h3 className="text-2xl">Honeywell</h3>
                    <h1 className="text-4xl font-bold">Floor Plan to Security Configuration</h1>
                </div>
                <hr className="my-4" />
            </div>
            <div className="container">
                <img src={landingPhoto} alt="Floor plan being processed to a security plan" className="w-full" />
            </div>
        </div>
    );
}

export default Landing;