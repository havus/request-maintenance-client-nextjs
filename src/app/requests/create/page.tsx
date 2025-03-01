'use client'

import { observable } from "mobx";
import { observer } from "mobx-react";
import RequestForm from "@comp/RequestForm";
import { FormState } from "@/app/_types/RequestMaintenance";

const initialState: FormState = {
  title: "",
  description: "",
  urgency: null,
  status: null,
}

let formState: FormState = observable({...initialState});

const CreateRequest = () => {
  const handleSaveButton = () => {
    Object.assign(formState, initialState);
  }

  return (
    <div className="w-[300] flex flex-col">
      <RequestForm formState={formState} onClick={handleSaveButton}></RequestForm>
    </div>
  )
}

export default observer(CreateRequest);
