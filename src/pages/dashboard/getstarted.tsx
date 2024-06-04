import GradientHeading, { GradientHeadingHot} from "@/components/Widgets/GradientHeading";
import BorderButton, {ButtonBorderBlue} from "@/components/Widgets/atoms/StandardBorderButton";
import { useContext, useEffect, useReducer, useState } from "react";
import withAccountPrevention from "@/components/h-components/withAccountPrevention"
import 'animate.css';
import { UserContext } from "@/components/global/userStandardContext";
import { useRouter } from "next/router";
import LoadingScreen from "@/components/Widgets/molecules/LoadingScreen";
import FormInput from "@/components/Widgets/atoms/FormInput";
import { GetStartedReducer, initialState } from "@/components/hooks/reducers/GetStartedReducer";
import { ReactTags } from 'react-tag-autocomplete'
import { TagsInput } from "react-tag-input-component";
import { yearsBetween } from "@/components/global/interfaces";
import MultipleSelect from "@/components/Widgets/molecules/MultipleSelect";
import { HobbiesSuggetions } from "@/components/global/superglobals";

const GetStarted = (props: any) => {
  const [custom, dispatch] = useReducer(GetStartedReducer, initialState)
  const [validation, setValidation] = useState(false)
  useEffect(() => {
    console.log(custom)
  }, [custom])
  return <div className={`mt-5 p-2 ${validation ? "select-none blur-sm" : ""}`} aria-disabled>
      <small className="block text-gray-400">Gender</small>
      <select className="border outline-none p-2 w-1/2 rounded" contentEditable={validation} onChange={(e) => dispatch({type: "gender", gender: e.target.value})} value={custom?.gender}>
        <option> - </option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <small className="block text-gray-400 mt-5">Birthdate</small>
      <input contentEditable={validation} type="date" className="border outline-none p-2 w-1/2 rounded" min={1} max={125} onChange={(e) => dispatch({type: "birthdate", birthdate: e.target.valueAsDate ?? new Date()})}/>

      <small className="block text-gray-400 mt-5">Hobbies</small>
      {/* <MultipleSelect /> */}
      <ReactTags selected={custom?.preferences?.map((v:string) => {return {label:v, value:v}}) ?? []} isDisabled={validation} onAdd={(Tag) => dispatch({type: "preferences", preferences: [...custom?.preferences ?? [], Tag.value]})} suggestions={HobbiesSuggetions} onDelete={(index:number) => dispatch({type: "preferences", preferences: custom?.preferences?.filter((_, i) => i !== index)})}/>
     {/* <TagsInput value={custom?.preferences ?? []} disabled={validation} onChange={(value) => dispatch({type: "preferences", preferences: value})}/> */}
    <small className="block text-gray-400 mt-5">Hobbies</small>
    <TagsInput value={custom?.hobbies ?? []} onChange={(e) => {
      dispatch({type:"hobbies", hobbies: e})
    }} disabled={validation}/>
    <ButtonBorderBlue className="mt-2 w-full" disabled={(!custom?.birthdate || !custom.gender || !custom?.hobbies?.length || !custom.preferences?.length)} onClick={() => {
      setValidation(true)
      const age = yearsBetween(custom?.birthdate) ?? 0
      if (age<10) {
         
      }
    }}>Let{"'"}s go!</ButtonBorderBlue>
</div>
}

interface CustomizationUIProps {

}

const CustomizationUI = (props: CustomizationUIProps) => {
  const [userAgrees, setAgreement] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const userContext = useContext(UserContext)
  const navigator = useRouter()
  useEffect(() => {
    if (userContext?.UserInfo?.userIsCustomised) {
       console.log("US_CUSTOM")
       navigator.replace("/dashboard")
    } else {
      setLoading(false)
    }
  }, [])
  return (
    <div className="flex flex-col items-center justify-items-center justify-center h-screen">
        <LoadingScreen isLoading={isLoading}/>
        <div className={`p-10 rounded-md border flex flex-col overflow-visible bg-white w-1/3`}>
              <div className={`transition-all duration-500 flex flex-col`}>
                <GradientHeadingHot className="text-2xl border-b-4 border-double pb-2">Let{"'"}s Get Started!</GradientHeadingHot>
                  {!userAgrees? <div>
                      <p className="mt-5 font-nunito border-b-4 border-double mb-2 pb-2">
                        <b className="font-extrabold block">Disclaimer:</b>
                        In order to make sure you get the right content, we need a few details regarding you and your interests.
                        This information is mandatory as without it, finding the right books for you will be difficult for the AI.
                        If you are not comfortable with providing this information, you can ask questions at: 
                        <span className="text-blue-500 ml-1">arcade.acme.org@gmail.com</span>
                      </p>
                      
                    <ButtonBorderBlue onClick={(e) => setAgreement(true)} className="mt-2">I agree with the conditions above</ButtonBorderBlue>
                  </div>: <GetStarted/>}
                
              </div>
        </div>
    </div>
  );
};

export default withAccountPrevention(CustomizationUI);