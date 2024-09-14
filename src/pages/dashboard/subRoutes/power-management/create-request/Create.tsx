import { useState } from "react";
import InputSelect from "../../../../../components/inputSelect/InputSelect";
import styles from "./Create.module.scss"
import { formOptions } from "./constant";

const initialState = {
    homeFacility: '',
    lightPoints: '',
    bulbType: '',
    securityLight: '',
    conditioners: '',
    microwave: '',
    chandelier: '',
    tvInches: '',
    washingMachine: '',
    electricOven: '',
    secLightNo: '',
    refrigerators: '',
    tvNumber: '',
    deepFreezers: '',
    waterHeaters: '',
    acCapacity: '',
    waterPumps: '',
    fans: '',
    otherItem: ''
}


const Create = () => {
    const [formData, setFormData] = useState(initialState)


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>, field: string) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };


    return (
        <main className={styles.main}>
            <p className={styles.title}>Personal Information</p>
            <div className={styles.form}>
                <div className={styles.divs}>
                    <div className={styles.firstDiv}>
                        <InputSelect
                            id="homeFacility"
                            label="What type of home facility do you have?"
                            value={formData.homeFacility}
                            onChange={(e) => handleSelectChange(e, 'homeFacility')}
                            options={formOptions.homeFacility}
                        />

                        <InputSelect
                            id="lightPoints"
                            label="How many light points do you have in the apartment?"
                            value={formData.lightPoints}
                            onChange={(e) => handleSelectChange(e, 'lightPoints')}
                            options={formOptions.lightPoints}
                        />

                        <InputSelect
                            id="bulbType"
                            label="What type of bulbs?"
                            value={formData.bulbType}
                            onChange={(e) => handleSelectChange(e, 'bulbType')}
                            options={formOptions.bulbType}
                        />

                        <InputSelect
                            id="securityLight"
                            label="What type of security lights?"
                            value={formData.securityLight}
                            onChange={(e) => handleSelectChange(e, 'securityLight')}
                            options={formOptions.securityLight}
                        />

                        <InputSelect
                            id="conditioners"
                            label="How many air conditioners do you have?"
                            value={formData.conditioners}
                            onChange={(e) => handleSelectChange(e, 'conditioners')}
                            options={formOptions.conditioners}
                        />
                        <InputSelect
                            id="secLightNo"
                            label="How many security lights do you have?"
                            value={formData.secLightNo}
                            onChange={(e) => handleSelectChange(e, 'secLightNo')}
                            options={formOptions.secLightNo}
                        />
                        <InputSelect
                            id="chandelier"
                            label="How many chandelier do you have?"
                            value={formData.chandelier}
                            onChange={(e) => handleSelectChange(e, 'chandelier')}
                            options={formOptions.chandelier}
                        />
                        <InputSelect
                            id="tvInches"
                            label="How many inches is your TV?"
                            value={formData.tvInches}
                            onChange={(e) => handleSelectChange(e, 'tvInches')}
                            options={formOptions.tvInches}
                        />
                        <InputSelect
                            id="washingMachine"
                            label="Do you have a washing machine?"
                            value={formData.washingMachine}
                            onChange={(e) => handleSelectChange(e, 'washingMachine')}
                            options={formOptions.washingMachine}
                        />
                    </div>

                    <div className={styles.secondDiv}>
                        <InputSelect
                            id="electricOven"
                            label="Do you have an electric oven?"
                            value={formData.electricOven}
                            onChange={(e) => handleSelectChange(e, 'electricOven')}
                            options={formOptions.electricOven}
                        />
                        <InputSelect
                            id="microwave"
                            label="Do you have micro-wave?"
                            value={formData.microwave}
                            onChange={(e) => handleSelectChange(e, 'Microwave')}
                            options={formOptions.microwave}
                        />
                        <InputSelect
                            id="refrigerators"
                            label="How many refrigerators do you have?"
                            value={formData.refrigerators}
                            onChange={(e) => handleSelectChange(e, 'refrigerators')}
                            options={formOptions.refrigerators}
                        />
                        <InputSelect
                            id="tvNumber"
                            label="How many TVs do you have?"
                            value={formData.tvNumber}
                            onChange={(e) => handleSelectChange(e, 'tvNumber')}
                            options={formOptions.tvNumber}
                        />
                        <InputSelect
                            id="deepFreezers"
                            label="How many deep freezers do you have?"
                            value={formData.deepFreezers}
                            onChange={(e) => handleSelectChange(e, 'deepFreezers')}
                            options={formOptions.deepFreezers}
                        />
                        <InputSelect
                            id="waterHeaters"
                            label="How many water heaters do you have?"
                            value={formData.waterHeaters}
                            onChange={(e) => handleSelectChange(e, 'waterHeaters')}
                            options={formOptions.waterHeaters}
                        />
                        <InputSelect
                            id="acCapacity"
                            label="Give the capacity of your AC"
                            value={formData.acCapacity}
                            onChange={(e) => handleSelectChange(e, 'acCapacity')}
                            options={formOptions.acCapacity}
                        />
                        <InputSelect
                            id="waterPumps"
                            label="Do you have a water pump? What is the capacity?"
                            value={formData.waterPumps}
                            onChange={(e) => handleSelectChange(e, 'waterPumps')}
                            options={formOptions.waterPumps}
                        />
                        <InputSelect
                            id="fans"
                            label="How many fans do you have?"
                            value={formData.fans}
                            onChange={(e) => handleSelectChange(e, 'fans')}
                            options={formOptions.fans}
                        />
                    </div>
                </div>
                <div className={styles.selectDiv}>
                    <label className={styles.label} htmlFor="otherItem">Please mention any other electric appliance not mentioned here and their capacity</label>
                    <textarea
                        id="otherItem"
                        className={styles.select}
                        value={formData.otherItem}
                        onChange={(e) => handleSelectChange(e, 'otherItem')}
                        name="otherItem"
                        cols={30} rows={10}>
                    </textarea>
                </div>
            </div>

        </main>
    )
}

export default Create;