import React from 'react';
import { motion } from 'framer-motion';
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
  handlechange,
  isLoading,
  userStatus,
  containerVariants,
  itemVariants
}) => {
  return (
    <>
      {userStatus && userStatus === "Approve" ? (
        <section>
          <div className="flex justify-center gap-24 px-5 py-8 md:px-14">
            <Card className="w-1/2">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                  Create Campaign
                </h5>
              </motion.div>
              <div className="flex justify-center">
                <motion.form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="flex flex-col gap-4 md:flex-row" variants={itemVariants}>
                    <div>
                      <div className="block mb-2">
                        <Label htmlFor="campaign_title" value="Campaign Title" />
                      </div>
                      <TextInput
                        id="title"
                        type="text"
                        placeholder="Enter Campaign Title"
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
                  </motion.div>
                  <motion.div variants={itemVariants}>
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
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <div className="block mb-2">
                      <Label htmlFor="campaign_cateogry" value="Category" />
                    </div>
                    <Select id="select_category" name="category" defaultValue={"NA"} onChange={handlechange} required>
                      <option value="NA" disabled>
                        Select Campaign Category
                      </option>
                      <option value="health">Health & Medical</option>
                      <option value="education">Education</option>
                      <option value="technology">Technology & Innovation</option>
                      <option value="environment">Environment</option>
                      <option value="business">Business & Startups</option>
                      <option value="animal">Animals & Pets</option>
                      <option value="projects">Creative Projects</option>
                    </Select>
                  </motion.div>
                  <motion.div variants={itemVariants}>
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
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <div className="block mb-2">
                      <Label htmlFor="campaingn_thumbnil" value="Upload Campaign Thumbnail" />
                    </div>
                    <FileInput
                      type="file"
                      name="campaingn_thumbnail"
                      onChange={handlechange}
                      accept=".png, .jpeg, .jpg, image/png, image/jpeg"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <div className="block mb-2">
                      <Label htmlFor="camapaign_rep" value="Upload Campaign Report" />
                    </div>
                    <FileInput
                      type="file"
                      name="campaingn_report"
                      onChange={handlechange}
                      accept="application/pdf"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                      required
                    />
                  </motion.div>

                  <motion.hr className="my-4" variants={itemVariants} />

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      color={"blue"}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </div>
            </Card>
            <motion.div
              className="items-center justify-center hidden md:flex"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className="w-[450px] h-[450px] p-2"
                src="https://images.pexels.com/photos/7413909/pexels-photo-7413909.jpeg"
                width="450"
                height="400"
                alt="Donation Image"
              />
            </motion.div>
          </div>
        </section>
      ) : (
        <motion.div
          className="flex items-center justify-center -mt-3 h-screen"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md shadow-lg bg-blue-50">
            <div className="flex flex-col items-center p-8 text-center">
              <h2 className="text-2xl font-bold text-blue-700 mb-3">Account Status is: <span className="underline" style={{ color: '#E3A008' }}>{userStatus}</span></h2>
              <p className="text-blue-600">
                Your user authentication is in progress. Currently, you can't create a campaign until you get approval for your profile.
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </>
  );
};

export default CreateCampaign;