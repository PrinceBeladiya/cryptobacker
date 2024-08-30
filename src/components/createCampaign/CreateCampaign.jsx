/* eslint-disable react/prop-types */
import {
  Card,
  TextInput,
  Label,
  Textarea,
  Button,
  Select,
  FileInput
} from "flowbite-react";

const CreateCampaign = ({ 
  handleSubmit,
  handlechange
}) => {
  return (
    <section>
      <div className="flex justify-center gap-24 px-5 py-8 md:px-14">
        <Card className="w-1/2">
          <div className="flex flex-col items-center">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
              Create Campaign
            </h5>
          </div>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div>
                  <div className="block mb-2">
                    <Label htmlFor="campaign_title" value="Campaign Title" />
                  </div>
                  <TextInput
                    id="title"
                    type="text"
                    placeholder="Enter Camapaign Title"
                    name="title"
                    onChange={handlechange}
                    required
                  />
                </div>
                <div>
                  <div className="block mb-2">
                    <Label htmlFor="target" value="Enter Target" />
                  </div>
                  <TextInput
                    id="target"
                    type="number"
                    name="target"
                    placeholder="ETH"
                    onChange={handlechange}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="block mb-2">
                  <Label htmlFor="description_lbl" value="Description" />
                </div>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter description..."
                  required
                  onChange={handlechange}
                  rows={4}
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label htmlFor="campaign_cateogry" value="Category" />
                </div>
                <Select id="select_category" name="category" defaultValue={"NA"} onChange={handlechange} required>
                  <option value="NA" disabled>
                    Select Camapaign Category
                  </option>
                  <option value="health">Health & Medical</option>
                  <option value="education">Education</option>
                  <option value="technology">Technology & Innovation</option>
                  <option value="environment">Environment</option>
                  <option value="business">Business & Startups</option>
                  <option value="animal">Animals & Pets</option>
                  <option value="projects ">Creative Projects</option>
                </Select>
              </div>
              <div>
                <div className="block mb-2">
                  <Label htmlFor="deadline_lbl" value="Ending Date" />
                </div>
                <input
                  type="date"
                  name="deadline"
                  onChange={handlechange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label htmlFor="campaingn_thumbnil" value="Upload Campaign Thumbnil" />
                </div>
                <FileInput
                  type="file"
                  name="campaingn_thumbnail"
                  onChange={handlechange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                  required
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label htmlFor="camapaign_rep" value="Upload Campaign Report" />
                </div>
                <FileInput
                  type="file"
                  name="campaingn_report"
                  onChange={handlechange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                  required
                />
              </div>

              <hr className="my-4" />

              <Button type="submit" color={"blue"}>
                Submit
              </Button>
            </form>
          </div>
        </Card>
        <div className="items-center justify-center hidden md:flex">
          <img
            className="w-[450px] h-[450px] p-2"
            src="https://images.pexels.com/photos/7413909/pexels-photo-7413909.jpeg"
            width="450"
            height="400"
            alt="Donation Image"
          />
        </div>
      </div>
    </section>
  );
};

export default CreateCampaign;
