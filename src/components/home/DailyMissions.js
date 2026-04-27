import ReusableWindow from "../ui/ReusableWindow"

function DailyMissions() {
    return (
        <ReusableWindow title="Daily_missions.sys">
            <div className="flex p-base flex-col items-start gap-base self-stretch">
               {/** Header */}
               <div className="heading-h5-primary font-semibold">DAILY MISSIONS</div>
            </div>
            
        </ReusableWindow>
    )
}

export default DailyMissions
