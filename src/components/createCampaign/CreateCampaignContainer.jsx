import CreateCampaign from "./CreateCampaign"
import { useState } from "react";
import { isAlphabets, isdescreption, isFutureDate } from "../../utils";
import toast from "react-hot-toast";
import { createCampaign, getCampaigns } from "../../context";
import { useSelector } from "react-redux";
const CreateCampaignContainer = () => {

  const { userName } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    target: '',
    description: '',
    category: 'NA',
    deadline: '',
    campaingn_thumbnail: undefined,
    campaingn_report: undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.length > 0 && formData.description.trim().length > 0 && formData.select_category != 'NA') {
      if (isAlphabets(formData.title) && Number(formData.target) > 0 && isFutureDate(formData.deadline)) {
        formData['name'] = userName;

        await createCampaign(formData);
        const data = await getCampaigns();
        console.log(data);
      }
      else {
        toast.error('Please Fill Valid Deatils', 'warn')
      }
    }
    else {
      toast.error('Please Fill all Details')
    }
  }

  const handlechange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  return (
    <CreateCampaign
      handleSubmit={handleSubmit}
      handlechange={handlechange}
    />
  )
}

export default CreateCampaignContainer