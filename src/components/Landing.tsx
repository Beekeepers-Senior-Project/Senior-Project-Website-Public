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
                <h3 className="text-2xl font-bold mb-2">Project Overview</h3>
                <p>
                    This project represents a capstone effort designed to prepare students for real-world industry work. It uses artificial intelligence to solve a complex issue. The system is built on a robust framework that interprets items and analyzes data for actionable outcomes.
                </p>
            </div>
        </div>
    );
}

export default Landing;