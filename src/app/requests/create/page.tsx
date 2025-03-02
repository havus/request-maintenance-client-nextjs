'use client'

import { observable } from "mobx";
import { observer } from "mobx-react";
import RequestForm from "@comp/RequestForm";
import { FormState } from "@/app/_types/RequestMaintenance";
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from "@/app/_graphql/mutations";
import { useRouter } from 'next/navigation'

const initialState: FormState = {
  id: "",
  title: "",
  description: "",
  urgency: null,
  status: null,
}

const formState: FormState = observable({...initialState});

const CreateRequest = () => {
  const router = useRouter();
  const [addRequest] = useMutation(CREATE_TASK);

  const handleSaveButton = () => {
    const requestPayload = {...formState};
    delete requestPayload.id;

    addRequest({ variables: { input: requestPayload } });

    Object.assign(formState, initialState);
    router.push('/requests')
  }

  return (
    <div className="w-[300] md:w-[447px] flex flex-col">
      <RequestForm formState={formState} handleSave={handleSaveButton}></RequestForm>
    </div>
  )
}

export default observer(CreateRequest);
