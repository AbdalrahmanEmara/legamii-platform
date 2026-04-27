import Btn1 from "../ui/Btn1"
import Button from "../ui/Button"
import ButtonSecondary from "../ui/ButtonSecondary"
import ReusableWindow from "../ui/ReusableWindow"

function WelcomeWindow() {
    return (
           <ReusableWindow title="welcome.sys">
            <div className="flex p-base flex-col gap-sm self-stretch items-start">
              {/** Welcome message */}
              <div className="heading-h4 font-primary text-text font-semibold">
                 WELCOME BACK , NAME
              </div>
              {/** Join class */}
              <div className="flex flex-col px-sm gap-base self-stretch items-start">
                <p className="body-1">Ready to join your class ?</p>
                {/** Class code */}
                <div className="flex items-center gap-md self-stretch">
                      <input>
                      </input>

                      <Btn1 title="JOIN" className={`rounded-md gap-xs label-1 font-semibold`} />
                </div>
              </div>
            </div>
            </ReusableWindow> 
    )
}

export default WelcomeWindow
