import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import joeHeadshot from "../assets/headshots/joe-headshot.webp";
import josiahHeadshot from "../assets/headshots/josiah-headshot.webp";
import charlesHeadshot from "../assets/headshots/charles-headshot.webp";
import dylanHeadshot from "../assets/headshots/dylan-headshot.webp";
import chrisHeadshot from "../assets/headshots/chris-headshot.webp"
import reidHeadshot from "../assets/headshots/reid-headshot.webp"


function TeamOverview() {
    const charlesBio = "Charles von Goins is a graduating software engineering major at RIT and hails from Takoma Park, Maryland. He has experience in the domains of web engineering, AI agent development, and project managing. He has also had the tremendous opportunity to have two pre-prints added to his research portfolio, which dealt with Crypto systems and AI Ethic Frameworks. Currently, he is working part-time, at his most recent summer internship, at the Parsons Corporation, where his domain is centered on developing certain web apps/systems for the Pacific Air Forces of the United States."

    const josiahBio = "Josiah Claudio is a 4th-year software engineering student at Rochester Institute of Technology from Rochester, NY. Since the summer 2024, he has been a Software Engineering Co-op at the Laboratory for Laser Energetics, where he works with C++ and Qt to develop new features for UI applications while refactoring and maintaining existing code."

    const dylanBio = "Dylan Morton is a 5th year software engineering major at RIT. He is from Albany, New York where he started his career as a software engineering co-op for Comcast, working on digital infrastructure software. For the past year and a half Dylan has been working for CACI's Mastodon Design team in Rochester, New York as a software test engineering co-op where he engineered tests for embedded systems and RF equipment."

    const reidBio = "Reid Taylor is a 5th year software engineering senior at RIT from Ann Arbor, Michigan. He previously worked at PremiseAware, a startup in the Ann Arbor area building custom software tools for security and surveillance systems, using a variety of computer vision and machine learning tools. More recently, he spent 6 months at Soar Technologies, developing web-based apps to interface with AI-driven training software for the US Navy."

    const joeBio = "Joseph Moran is a 4th year software engineering major from Bridgeport, CT. He's previously worked at Bayer Radiology in Pittsburgh, PA on their DevOps and embedded development teams as well as at Lockheed Martin in Moorestown, NJ on their display systems for the Aegis Combat System. He's passionate about programming, homelabbing, travel, and personal finance. After graduating in May 2026, he'll be starting full-time at Lockheed Martin Space in Littleton, CO."

    const chrisBio = "Chris Wake is a graduate of Rochester Institute of Technology and Florida Atlantic University. He brings over 30 years of experience in the software industry, having held roles in both software engineering and management. After six years as an adjunct professor at RIT, Chris transitioned from the corporate world to academia full-time, joining the Software Engineering department as a lecturer. His most recent industry role was as Senior Director of Editorial Tools at Reuters News, where he led teams developing tools for global journalism."

    return (
        <div>
            <div className="container pt-5">
                <div className="text-center pt-3">
                    <h1 className="text-4xl font-bold">Senior Project Team</h1>
                </div>
                <hr className="my-4" />
            </div>

            <div className="container grid gap-4 grid-cols-1 lg:grid-cols-2">
                <TeamMemberCard name="Charles Von Goins II" role="Project Lead" bio={charlesBio} profilePicUrl={charlesHeadshot}/>
                <TeamMemberCard name="Dylan Morton" role="Integration/Devops Lead" bio={dylanBio} profilePicUrl={dylanHeadshot}/>
                <TeamMemberCard name="Joseph Moran" role="Communications Lead" bio={joeBio} profilePicUrl={joeHeadshot}/>
                <TeamMemberCard name="Josiah Claudio" role="Backend Lead" bio={josiahBio} profilePicUrl={josiahHeadshot}/>
                <TeamMemberCard name="Reid Taylor" role="Backend Lead" bio={reidBio} profilePicUrl={reidHeadshot}/>
                <TeamMemberCard name="Christopher Wake" role="Faculty Coach" bio={chrisBio} profilePicUrl={chrisHeadshot}/>
            </div>
        </div>
    );
}

function TeamMemberCard({ name, role, bio, profilePicUrl }: { name: string; role: string; bio: string, profilePicUrl: string }) {
    return (
        <Card className="mb-4">
            <div className="flex flex-col h-full md:flex-row">
                <div className="card-left flex items-center flex-shrink-0 justify-center">
                    <img className="h-40 w-40 m-4 rounded-full" src={profilePicUrl} alt={`${name}'s profile`}/>
                </div>
                <div className="card-right w-full pl-0">
                    <CardHeader className="pb-1 text-center md:text-left">
                        <CardTitle>
                            {name}
                        </CardTitle>
                        <CardTitle className="font-normal">
                            <span className="font-bold">Role:</span> {role}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            {bio}
                        </CardDescription>
                    </CardContent>
                </div>
            </div>
           
        </Card>
    );
}

export default TeamOverview;