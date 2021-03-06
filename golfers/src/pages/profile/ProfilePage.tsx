// external imports
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { Select, Modal, Input } from 'native-base';
import * as Linking from 'expo-linking';

// internal imports
import {
    dark_grey,
	primary_color,
	alternate_color,
	white,
	grey,
	offline_status,
} from '../../options.json';
import { ProfileItem } from '../../components';
import { IProfile } from '../../interfaces'; 
import { editGolferInfo, getGolferInfo } from '../../middleware';

export function ProfilePage({route, navigation}: any) {
	const golfer_id: number = route.params.golfer_id;
	const appUserId: number = route.params.appUserId;
	const profileStatus: number = route.params.profileStatus;

	const [golfer, setGolfer] = useState<IProfile>();
	const [editGolfer, setEditGolfer] = useState<IProfile>();
	const [service, setService] = useState<string>('none');

	// modals
	const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);

	useEffect(() => {
		if (service == 'logout') {
			setShowLogoutModal(true);
			setService('none');
		} else if (service == 'deleteAccount') {
			setShowDeleteModal(true);
			setService('none');
		} else if (service == 'editProfile') {
			setShowEditModal(true);
			setService('none');
		}
		loadProfile();
	}, [service]);

	function handleLogout() {
		console.log('logging out');
		navigation.replace('Auth');
	}

	function handleEdit() {
		if (!editGolfer) return;
		editGolferInfo(editGolfer)
		.then(res => {
			if (res.success == true) {
				setGolfer(editGolfer);
				setShowEditModal(false);
			}
		})
	}

	function loadProfile() {
		getGolferInfo(golfer_id, profileStatus)
		.then((res) => {
			setGolfer(res);
			setEditGolfer(res);
		})
	}

	function handleRoutingBack() {
		navigation.pop(1);
	}

    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            style={styles.bg}
        >
            <SafeAreaView style={styles.container}>
				<View style={styles.top}>
					{profileStatus == 0 ?
						
						<Text style={styles.title}>Profile</Text>
					:
						<TouchableOpacity onPress={handleRoutingBack}>
							<Text style={styles.icon}>
								<Ionicons name="arrow-back" size={24} color="black" />
							</Text>
						</TouchableOpacity>
					}
					
					{golfer_id == appUserId ?
						<Select onValueChange={(value) => setService(value)} borderWidth={0} dropdownIcon={<Ionicons name="ios-settings" size={24} color="black" />}>
							<Select.Item label='Edit profile' value='editProfile' />
							{/* <Select.Item label='Change password' value='changePassword' /> */}
							<Select.Item label='Log out' value='logout' />
							<Select.Item label='Delete account' value='deleteAccount' />
						</Select>
					:
						<Select onValueChange={(value) => setService(value)} borderWidth={0} dropdownIcon={<SimpleLineIcons name="options-vertical" size={15} color="black" />}>
							<Select.Item label='Report' value='report' />
						</Select>
					}
				</View>

				<ScrollView>
					{golfer && profileStatus !=1 ?
						<ProfileItem
							golfer={golfer}
							profileStatus={profileStatus}
						/> : null
					}
					{golfer && profileStatus == 2 && golfer_id != appUserId ?
						<View style={styles.actionsCardItem}>
							<TouchableOpacity 
								onPress={() => {
									Linking.openURL(`sms:+1${golfer.phoneNum}`)
								}}
								style={styles.outlineButton}
							>
								<Text style={styles.iconButton}>
									<Entypo name="message" size={24} color="white" />
								</Text>
								<Text style={styles.textButton}>Message</Text>
							</TouchableOpacity>
						</View> : null
					}
				</ScrollView>

				<Modal size={'lg'} isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
					<Modal.Content>
						<Modal.CloseButton />
                        <Modal.Header>Log Out</Modal.Header>
                        <Modal.Body>
                            <Text>Are you sure you want to log out?</Text>
                        </Modal.Body>
                        <Modal.Footer style={styles.footer}>
                            <TouchableOpacity 
                                onPress={handleLogout} 
                                style={styles.likeButton}
                            >
                                <Text style={styles.buttonText}>Logout</Text>
                            </TouchableOpacity>
							<TouchableOpacity 
                                onPress={() => setShowLogoutModal(false)} 
                                style={styles.cancelButton}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </Modal.Footer>
					</Modal.Content>
				</Modal>

				<Modal size={'lg'} isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
					<Modal.Content>
						<Modal.CloseButton />
                        <Modal.Header>Delete Account</Modal.Header>
                        <Modal.Body>
                            <Text>Are you sure you want to delete your account?</Text>
                        </Modal.Body>
                        <Modal.Footer style={styles.footer}>
                            <TouchableOpacity 
                                onPress={handleLogout} 
                                style={styles.deleteButton}
                            >
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
							<TouchableOpacity 
                                onPress={() => setShowLogoutModal(false)} 
                                style={styles.cancelButton}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </Modal.Footer>
					</Modal.Content>
				</Modal>

				<Modal size={'xl'} isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
					<Modal.Content>
						<Modal.CloseButton />
                        <Modal.Header>Edit Profile</Modal.Header>
                        <Modal.Body>
							{editGolfer ?
								<View>
									<View style={styles.editOption}>
										<Text style={styles.editOptionDescriptor}>First Name</Text>
										<Input 
											borderColor={primary_color} borderWidth={1.5} width={"35%"} variant="outline" 
											placeholder="First name" value={editGolfer.firstName} 
											onChangeText={(value) => {
												setEditGolfer((prev: any) => {
													return {
														...prev,
														'firstName': value
													}
												})
											}}
										/>
									</View>
									<View style={styles.editOption}>
										<Text style={styles.editOptionDescriptor}>Last Name</Text>
										<Input 
											borderColor={primary_color} borderWidth={1.5} width={"35%"} variant="outline" 
											placeholder="Last name" value={editGolfer.lastName} 
											onChangeText={(value) => {
												setEditGolfer((prev: any) => {
													return {
														...prev,
														'lastName': value
													}
												})
											}}
										/>
									</View>
									<View style={styles.editOption}>
										<Text style={styles.editOptionDescriptor}>Handicap</Text>
										<Input 
											borderColor={primary_color} borderWidth={1.5} width={"35%"} variant="outline" 
											placeholder="Handicap" value={editGolfer.handicap.toString()} 
											keyboardType='number-pad'
											onChangeText={(value) => {
												setEditGolfer((prev: any) => {
													return {
														...prev,
														'handicap': Number(value)
													}
												})
											}}
										/>
									</View>
									<View style={styles.editOption}>
										<Text style={styles.editOptionDescriptor}>Age</Text>
										<Input 
											borderColor={primary_color} borderWidth={1.5} width={"35%"} variant="outline" 
											placeholder="Age" value={editGolfer.age.toString()} 
											keyboardType='number-pad'
											onChangeText={(value) => {
												setEditGolfer((prev: any) => {
													return {
														...prev,
														'age': Number(value)
													}
												})
											}}
										/>
									</View>

									<View style={styles.editOption}>
										<Text style={styles.editOptionDescriptor}>Phone Number</Text>
										<Input 
											borderColor={primary_color} borderWidth={1.5} width={"35%"} variant="outline" 
											placeholder="Phone number" value={editGolfer.phoneNum} 
											keyboardType='number-pad'
											onChangeText={(value) => {
												setEditGolfer((prev: any) => {
													return {
														...prev,
														'phoneNum': value
													}
												})
											}}
										/>
									</View>
								</View> : null
							}
                        </Modal.Body>
                        <Modal.Footer style={styles.footer}>
                            <TouchableOpacity 
                                onPress={handleEdit} 
                                style={styles.likeButton}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
							<TouchableOpacity 
                                onPress={() => setShowLogoutModal(false)} 
                                style={styles.cancelButton}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </Modal.Footer>
					</Modal.Content>
				</Modal>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
	// CONTAINER - GENERAL
	bg: {
		flex: 1,
		resizeMode: "cover"
	},
	container: {
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: 10,
		height: '100%'
	},
    top: {
		paddingTop: 10,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
    title: { paddingBottom: 10, fontSize: 22, color: dark_grey },
    icon: {
		fontSize: 20,
		color: dark_grey,
		paddingRight: 10
	},
	iconButton: { fontSize: 20, color: white },
	textButton: {
		fontSize: 15,
		color: white,
		paddingLeft: 10
	},
	outlineButton: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: alternate_color,
		paddingHorizontal: 20
	},
	actionsCardItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 30,
		justifyContent: 'center'
	},
    buttonText: {
        textAlign: 'center',
        fontSize: 13,
        color: '#fff',
    },
    likeButton: {
        backgroundColor: primary_color,
        padding: 10,
        borderRadius: 10,
		marginRight: 10,
    },
	deleteButton: {
        backgroundColor: offline_status,
        padding: 10,
        borderRadius: 10,
		marginRight: 10,
	},
	cancelButton: {
        backgroundColor: grey,
        padding: 10,
        borderRadius: 10,
		marginRight: 10,
	},
	footer: {
		justifyContent: 'flex-start'
	},
	editOption: {
		marginBottom: 5,
	},
	editOptionDescriptor: {
		fontStyle: 'italic'
	}
});
