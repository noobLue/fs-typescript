import { SyntheticEvent, useState } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../types";

type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital"; 


const HealthCheck = ({healthCheckRating, setHealthCheckRating}: {healthCheckRating: number, setHealthCheckRating: (value: HealthCheckRating) => void}) => {
    
    return <div><label>Health rating <select value={healthCheckRating} onChange={({target})=>setHealthCheckRating(Number(target.value) as HealthCheckRating)}>
        <option value={HealthCheckRating.Healthy}>Healthy</option>
        <option value={HealthCheckRating.LowRisk}>LowRisk</option>
        <option value={HealthCheckRating.HighRisk}>HighRisk</option>
        <option value={HealthCheckRating.CriticalRisk}>CriticalRisk</option>
    </select></label></div>;
};

const OccupationalHealthcare = ({employerName, sickLeaveStart, sickLeaveEnd, setEmployerName, setSickLeaveStart, setSickLeaveEnd}:
    {employerName: string; setEmployerName: (value: string) => void;
    sickLeaveStart: string; setSickLeaveStart: (value: string) => void;
    sickLeaveEnd: string; setSickLeaveEnd: (value: string) => void;}
) => {
    return (<div>
        <div><label>
            Employer name <input value={employerName} onChange={({target}) => setEmployerName(target.value)} ></input>
        </label></div>
        <div><label>
            Sick leave start <input value={sickLeaveStart} type="date" onChange={({target}) => setSickLeaveStart(target.value)} ></input>
        </label></div>
        <div><label>        
            Sick leave start <input value={sickLeaveEnd} type="date" onChange={({target}) => setSickLeaveEnd(target.value)} ></input>
</label></div>
    </div>);
};

const Hospital = ({dischargeDate, dischargeCriteria, setDischargeDate, setDischargeCriteria}:
    {dischargeDate: string; setDischargeDate: (value: string) => void;
    dischargeCriteria: string; setDischargeCriteria: (value: string) => void;}
) => {
    return <div>
        <div><label>Discharge criteria</label> <input value={dischargeCriteria} onChange={({target}) => setDischargeCriteria(target.value)} ></input></div>
        <div><label>Discharge date <input value={dischargeDate} type="date" onChange={({target}) => setDischargeDate(target.value)} ></input></label></div>
    </div>;

};

const EntryForm = ({diagnoses, submitEntry, id}:{diagnoses: Diagnosis[], submitEntry: (entry: EntryWithoutId) => void, id: string}) => {
    const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
    const [errorMessage, setErrorMessage] = useState("");

    const [inputDiagnoses, setInputDiagnoses] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    
    //Healthcheck
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

    //Occupational
    const [employerName, setEmployerName] = useState("");
    const [sickLeaveStart, setSickLeaveStart] = useState("");
    const [sickLeaveEnd, setSickLeaveEnd] = useState("");
    
    //Hospital
    const [dischargeCriteria, setDischargeCriteria] = useState("");
    const [dischargeDate, setDischargeDate] = useState("");


    const postEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        if(!id)
        {
            setErrorMessage("Unexpected patient error");
            return;
        }

        const baseEntry = {diagnosisCodes: inputDiagnoses, description, date, specialist};

        if(entryType === "HealthCheck")
        {
            submitEntry({...baseEntry, type: entryType, healthCheckRating});
        }
        else if (entryType === "OccupationalHealthcare")
        {
            if(sickLeaveStart.length > 0 && sickLeaveEnd.length > 0)
            {
                submitEntry({...baseEntry, type: entryType, employerName, sickLeave: {startDate: sickLeaveStart, endDate: sickLeaveEnd}});
            }
            else 
            {
                submitEntry({...baseEntry, type: entryType, employerName});
            }
        }
        else if (entryType === "Hospital")
        {
            submitEntry({...baseEntry, type: entryType, discharge: {date: dischargeDate, criteria: dischargeCriteria}});
        }
        else 
        {
            throw new Error("Unknown entry type");
        }
    };
    
    return <form onSubmit={postEntry} style={{border: "1px solid black", margin: "5px", padding: "10px" }}>
        {errorMessage.length > 0 && <div>Error: {errorMessage}</div>}
        Add a new Entry 
        <select value={entryType} onChange={({target})=>setEntryType(target.value as EntryType)}>
            <option value="HealthCheck">HealthCheck</option>
            <option value="OccupationalHealthcare">OccupationalHealthcare</option>
            <option value="Hospital">Hospital</option>
        </select>

        <div><label>Description <input value={description} onChange={({target})=>setDescription(target.value)}></input></label></div>
        <div><label>Date<input type="date" value={date} onChange={({target})=>setDate(target.value)}></input></label></div>
        <div><label>Specialist <input value={specialist} onChange={({target})=>setSpecialist(target.value)}></input></label></div>
        <div><label>Diagnoses <select multiple value={inputDiagnoses} onChange={({target})=>setInputDiagnoses(Array.from(target.selectedOptions, (option)=>option.value))}>
            {diagnoses.map(d => <option key={d.code} value={d.code}>{d.code}</option>)}
        </select></label></div>

        {entryType === "HealthCheck" && <HealthCheck healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating}/>}
        {entryType === "OccupationalHealthcare" && <OccupationalHealthcare employerName={employerName} setEmployerName={setEmployerName} sickLeaveStart={sickLeaveStart} setSickLeaveStart={setSickLeaveStart} sickLeaveEnd={sickLeaveEnd} setSickLeaveEnd={setSickLeaveEnd}/>}
        {entryType === "Hospital" && <Hospital dischargeDate={dischargeDate} dischargeCriteria={dischargeCriteria} setDischargeDate={setDischargeDate} setDischargeCriteria={setDischargeCriteria} />}

        <button>Add</button>
    </form>;
};

export default EntryForm;