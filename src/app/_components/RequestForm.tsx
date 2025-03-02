'use client'

import { useEffect, useState } from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@comp/Select";
import { Label } from "@comp/Label";
import { FormState, RequestMaintenance } from "@/app/_types/RequestMaintenance";
import { translateUrgency, translateStatus } from "@/app/_utils/requestMaintenance";

const RequestForm = ({ formState, handleSave }: { formState: FormState, handleSave: (e: any) => void }) => {
  const [triggerColUrg, setTriggerColUrg] = useState('text-[#DCDCDC]');
  const [triggerColStat, setTriggerColStat] = useState('text-[#DCDCDC]');

  const changeColTriggerUrg = () => {
    if (formState.urgency === null) return setTriggerColUrg('text-[#DCDCDC]');
    
    setTriggerColUrg('text-[#404040]');
  }
  const changeColTriggerStat = () => {
    if (formState.status === null) return setTriggerColStat('text-[#DCDCDC]');

    setTriggerColStat('text-[#404040]');
  }

  useEffect(() => {
    // if (data) {
    //   formState.title = data.title;
    //   formState.description = data.description;
    //   formState.urgency = Number(translateUrgency(data.urgency));
    //   formState.status = Number(translateStatus(data.status));
    // }
  }, [])

  return (
    <>
      <div className="flex flex-col gap-[25px] pt-[25px]">
        <div className="flex flex-col">
          <Label htmlFor="urgency">
            Urgency *
          </Label>

          <Select
            value={formState.urgency !== null ? String(formState.urgency) : ""}
            onValueChange={
              action(
                (val: string) => {
                  formState.urgency = Number(val);
                  changeColTriggerUrg();
                }
              )
            }
          >
            <SelectTrigger id="urgency" className={"w-[300px] " + triggerColUrg}>
              <SelectValue placeholder="Select Urgency"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Non Urgent</SelectItem>
                <SelectItem value="1">Less Urgent</SelectItem>
                <SelectItem value="2">Urgent</SelectItem>
                <SelectItem value="3">Emergency</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="status">
            Status
          </Label>

          <Select
            value={formState.status !== null ? String(formState.status) : ""}
            onValueChange={
              action(
                (val: string) => {
                  formState.status = Number(val);
                  changeColTriggerStat();
                }
              )
            }
          >
            <SelectTrigger id="status" className={"w-[300px] " + triggerColStat}>
              <SelectValue placeholder="Select Status"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Open</SelectItem>
                <SelectItem value="1">Resolved</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="title">
            Title *
          </Label>

          <input
            id="title"
            type="text"
            value={String(formState.title)}
            onChange={action((e) => formState.title = e.target.value )}
            placeholder="eg. Crack in plasterboard"
            className="placeholder:text-[#DCDCDC] bg-white text-[#404040] rounded-[12px] px-[16px] py-[14px] text-[13px] drop-shadow-[0_8px_32px_rgba(110,113,145,0.12)]"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="description">
            Description
          </Label>

          <textarea
            id="description"
            onChange={action((e) => formState.description = e.target.value )}
            value={String(formState.description)}
            placeholder="Description of your request"
            className="placeholder:text-[#DCDCDC] h-[188px] bg-white text-[#404040] rounded-[12px] px-[16px] py-[14px] text-[13px] drop-shadow-[0_8px_32px_rgba(110,113,145,0.12)]"
          />
        </div>
      </div>

      <button
        className="w-[268px] mx-auto text-[18px] leading-[24px] bg-[#36A388] hover:bg-[#4aac93] active:bg-[#30927A] text-white py-[12px] rounded-[8px] mt-[54px] md:mt-[46px] hover:cursor-pointer"
        onClick={action((e) => {
          e.preventDefault();

          handleSave(e);
          changeColTriggerUrg();
          changeColTriggerStat();
        })}
      >
        Save
      </button>
    </>
  )
}

export default observer(RequestForm);
