import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	Textarea,
	useDisclosure,
	useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { BiAddToQueue } from "react-icons/bi";
  import { BASE_URL } from "../App";
  
  const CreateUserModal = ({ setUsers }) => {
	// State and hooks initialization
	const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state management
	const [isLoading, setIsLoading] = useState(false); // Loading state for button
	const [inputs, setInputs] = useState({ // Form input values
	  name: "",
	  role: "",
	  description: "",
	  gender: "",
	});
	const toast = useToast(); // Toast notification hook
  
	// Function to handle form submission
	const handleCreateUser = async (e) => {
	  e.preventDefault(); // Prevent form from submitting normally
	  setIsLoading(true); // Set loading state to true while submitting
	  try {
		const res = await fetch(BASE_URL + "/coursemates", { // API call to create a new coursemate
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(inputs),
		});
  
		const data = await res.json(); // Parse response data
		if (!res.ok) {
		  throw new Error(data.error); // Throw error if response is not OK
		}
  
		// Show success toast notification
		toast({
		  status: "success",
		  title: "Yayy! 🎉",
		  description: "Course mate added successfully.",
		  duration: 2000,
		  position: "top-center",
		});
  
		onClose(); // Close the modal after successful submission
		setUsers((prevUsers) => [...prevUsers, data]); // Update users state with new data
  
		setInputs({ // Clear input fields after submission
		  name: "",
		  role: "",
		  description: "",
		  gender: "",
		});
	  } catch (error) {
		// Show error toast notification if API request fails
		toast({
		  status: "error",
		  title: "An error occurred.",
		  description: error.message,
		  duration: 4000,
		});
	  } finally {
		setIsLoading(false); // Set loading state back to false after submission completes
	  }
	};
  
	return (
	  <>
		{/* Button to open modal */}
		<Button
		  onClick={onOpen}
		  colorScheme="teal" // Button color scheme
		  size="sm" // Button size
		  leftIcon={<BiAddToQueue />} // Icon for button
		  mt={4} // Top margin for button
		>
		  Add New Course Mate
		</Button>
  
		{/* Modal component */}
		<Modal isOpen={isOpen} onClose={onClose}>
		  <ModalOverlay /> {/* Overlay for modal */}
		  <form onSubmit={handleCreateUser}> {/* Form submission handler */}
			<ModalContent
			  bg="gray.900" // Modal background color
			  color="white" // Text color
			>
			  <ModalHeader
				textAlign="center" // Center align header text
				borderBottomWidth="1px" // Bottom border for header
				borderColor="gray.700" // Border color
			  >
				Add New Course Mate
			  </ModalHeader>
			  <ModalCloseButton /> {/* Close button for modal */}
  
			  <ModalBody pb={6}> {/* Modal body content */}
				<Flex alignItems="center" flexDirection="column" gap={4}>
				  {/* Form controls */}
				  <FormControl w="80%"> {/* Form control for Full Name */}
					<FormLabel>Full Name</FormLabel>
					<Input
					  placeholder="John Doe"
					  value={inputs.name}
					  onChange={(e) =>
						setInputs({ ...inputs, name: e.target.value })
					  }
					/>
				  </FormControl>
  
				  <FormControl w="80%"> {/* Form control for Role */}
					<FormLabel>Role</FormLabel>
					<Input
					  placeholder="Software Engineer"
					  value={inputs.role}
					  onChange={(e) =>
						setInputs({ ...inputs, role: e.target.value })
					  }
					/>
				  </FormControl>
  
				  <FormControl w="80%"> {/* Form control for Description */}
					<FormLabel>Description</FormLabel>
					<Textarea
					  resize="none"
					  overflowY="hidden"
					  placeholder="He's a software engineer who loves to code and build things."
					  value={inputs.description}
					  onChange={(e) =>
						setInputs({ ...inputs, description: e.target.value })
					  }
					/>
				  </FormControl>
  
				  <RadioGroup w="80%"> {/* Radio group for gender selection */}
					<Flex justifyContent="space-between">
					  <Radio
						value="male"
						onChange={(e) =>
						  setInputs({ ...inputs, gender: e.target.value })
						}
					  >
						Male
					  </Radio>
					  <Radio
						value="female"
						onChange={(e) =>
						  setInputs({ ...inputs, gender: e.target.value })
						}
					  >
						Female
					  </Radio>
					</Flex>
				  </RadioGroup>
				</Flex>
			  </ModalBody>
  
			  <ModalFooter justifyContent="center"> {/* Center align footer */}
				<Button
				  colorScheme="teal"
				  mr={3}
				  type="submit"
				  isLoading={isLoading} // Loading state for submit button
				>
				  Add Course Mate
				</Button>
				<Button onClick={onClose}>Cancel</Button> {/* Cancel button */}
			  </ModalFooter>
			</ModalContent>
		  </form>
		</Modal>
	  </>
	);
  };
  
  export default CreateUserModal;
  





// import {
// 	Button,
// 	Flex,
// 	FormControl,
// 	FormLabel,
// 	Input,
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalFooter,
// 	ModalHeader,
// 	ModalOverlay,
// 	Radio,
// 	RadioGroup,
// 	Textarea,
// 	useDisclosure,
// 	useToast,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { BiAddToQueue } from "react-icons/bi";
// import { BASE_URL } from "../App";

// const CreateUserModal = ({ setUsers }) => {
// 	const { isOpen, onOpen, onClose } = useDisclosure();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [inputs, setInputs] = useState({
// 		name: "",
// 		role: "",
// 		description: "",
// 		gender: "",
// 	});
// 	const toast = useToast();

// 	const handleCreateUser = async (e) => {
// 		e.preventDefault(); // prevent page refresh
// 		setIsLoading(true);
// 		try {
// 			const res = await fetch(BASE_URL + "/friends", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify(inputs),
// 			});

// 			const data = await res.json();
// 			if (!res.ok) {
// 				throw new Error(data.error);
// 			}

// 			toast({
// 				status: "success",
// 				title: "Yayy! 🎉",
// 				description: "Friend created successfully.",
// 				duration: 2000,
// 				position: "top-center",
// 			});
// 			onClose();
// 			setUsers((prevUsers) => [...prevUsers, data]);

// 			setInputs({
// 				name: "",
// 				role: "",
// 				description: "",
// 				gender: "",
// 			}); // clear inputs
// 		} catch (error) {
// 			toast({
// 				status: "error",
// 				title: "An error occurred.",
// 				description: error.message,
// 				duration: 4000,
// 			});
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return (
// 		<>
// 			<Button onClick={onOpen}>
// 				<BiAddToQueue size={20} />
// 			</Button>

// 			<Modal isOpen={isOpen} onClose={onClose}>
// 				<ModalOverlay />
// 				<form onSubmit={handleCreateUser}>
// 					<ModalContent>
// 						<ModalHeader> My new BFF 😍 </ModalHeader>
// 						<ModalCloseButton />

// 						<ModalBody pb={6}>
// 							<Flex alignItems={"center"} gap={4}>
// 								{/* Left */}
// 								<FormControl>
// 									<FormLabel>Full Name</FormLabel>
// 									<Input
// 										placeholder='John Doe'
// 										value={inputs.name}
// 										onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
// 									/>
// 								</FormControl>

// 								{/* Right */}
// 								<FormControl>
// 									<FormLabel>Role</FormLabel>
// 									<Input
// 										placeholder='Software Engineer'
// 										value={inputs.role}
// 										onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
// 									/>
// 								</FormControl>
// 							</Flex>

// 							<FormControl mt={4}>
// 								<FormLabel>Description</FormLabel>
// 								<Textarea
// 									resize={"none"}
// 									overflowY={"hidden"}
// 									placeholder="He's a software engineer who loves to code and build things."
// 									value={inputs.description}
// 									onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
// 								/>
// 							</FormControl>

// 							<RadioGroup mt={4}>
// 								<Flex gap={5}>
// 									<Radio
// 										value='male'
// 										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
// 									>
// 										Male
// 									</Radio>
// 									<Radio
// 										value='female'
// 										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
// 									>
// 										Female
// 									</Radio>
// 								</Flex>
// 							</RadioGroup>
// 						</ModalBody>

// 						<ModalFooter>
// 							<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
// 								Add
// 							</Button>
// 							<Button onClick={onClose}>Cancel</Button>
// 						</ModalFooter>
// 					</ModalContent>
// 				</form>
// 			</Modal>
// 		</>
// 	);
// };
// export default CreateUserModal;
