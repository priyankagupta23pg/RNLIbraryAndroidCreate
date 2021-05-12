import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,PermissionsAndroid,
  Modal,
  ScrollView,
} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';

import helper from "../../utils/helper";
import images from '../../utils/img';
import SingleLineBtn from "../../components/single_line_btn";
import TxtFullScreenBtn from "../../components/txt_full_screen_btn";
import { CONST } from "../../utils/constants";
import ModalPopup from "../../components/modal_popup";
import SafeAreaContainer from "../../components/safearea_container";
import HeaderTxt from "../../components/header_txt";
import ErrorContainer from "../../components/error_container";
import Colors from "../../constants/Colors";


//import { register_user, get_faq } from "../../redux/actions";


//TODO:- Signup class
class Signup extends Component {
  //TODO:- constructor
  constructor(props) {
    super(props);
    this.state = {
      selectedImg:"",
      title: "",
      bodyTxt: "",
      isPopUpOpened: false,
      cell_no: "",
      name: "",
      email: "",
      password: "",
      keyboardVerticalOffsetValue: 0,
      is_terms_modal_opened: false,
      error_msg:
        "Please check that you've added a valid email\naddress and password.",
      is_error_msg_shown: false,
      is_btn_disabled: true,
      txt_one:
        "These Terms of Use (“Terms”) govern your access or use of applications, websites, content, products, and services (the “Services”) made available by Account LLC,its subsidiaries, affiliates, and related entities (collectively, Account). Please read the following Terms of Use carefully before accessing and/or using the Services.",
      txt_two:
        "Your access and use of the Services constitutes your agreement to be bound by these Terms, which establishes a legally binding agreement between you and Account. If you do not agree to these Terms, you may not access or use the Services.Account reserves the right, in our sole and absolute discretion, at any time, for any reason whatsoever, with or without notice, to terminate, suspend, amend, or modify the Services and/or the Terms related to the Services, which will be effective upon the posting of such updated Terms by Account on the Account website located at “www.Account.com” (the “Website”). Your continued access or use of the Services after such posting constitutes your consent to be bound by the Terms, as amended.  Account immediately terminate these Terms or any Services with respect to you, or generally cease offering or deny access to the Services or any portion thereof, at any time for any reason.Account collection and use of personal information in connection with the Services is as provided in the Privacy Policy located at www.Account.com/privacypolicy.In these Terms, the words “including” and “include” mean “including, but not limited to.”",
    };
  }

  //TODO:- class life cycle

  //TODO:- class life cycle
 
 callPicker=()=>{
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    mediaType:'photo',
    //cropping: true
  }).then(image => {
    console.log("RESPONSE"+image);
    this.setState({
      selectedImg:image.path
    })
  }).catch(e=>
  {
   // alert(e)
  }
  );
 }
 
chekPermission=async()=>{

  const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE );

if (granted) {
  this.callPicker()
}
else
{
console.log("PERMISSION"+"NOT GIVEN")
try {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  )
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    this.callPicker()
  } else {
   // alert("Location permission denied")
  }
} catch (err) {
  console.warn(err)
}

}
}
 

  componentDidUpdate(prevProps) {
    if (this.props.is_fetching !== prevProps.is_fetching) {
      if (this.props.is_fetching) {
        this.setState({ loading: true });
      } else if (!this.props.is_fetching) {
        this.setState({ loading: false }, () => {
          if (this.props.is_success !== prevProps.is_success) {
            if (this.props.is_success) {
              console.log(
                "user_datas",
                this.props && this.props.user_data && this.props.user_data
              );
              this.props.navigation.reset({
                index: 1,
                routes: [
                  {
                    name: "AppDrawer",
                    state: {
                      routes: [{ name: "AppDrawer" }],
                    },
                  },
                ],
              });
            }
          }
          if (this.props.error !== prevProps.error) {
            console.log("this.props.error", this.props.error);
            if (this.props.error == true) {
              this.setState({
                error_msg: this.props.msg,
                is_error_msg_shown: true,
              });
            }
          }
        });
      }
    }
  }

  //   if (this.props.is_success !== prevProps.is_success) {
  //     console.log("prevProps => " + prevProps.is_success);
  //     console.log("this.props => " + this.props.is_success);

  //     if (this.props.is_success) {
  //       console.log("user_datas", this.props.user_data);
  //       this.props.navigation.reset({
  //         index: 1,
  //         routes: [
  //           {
  //             name: "AppDrawer",
  //             state: {
  //               routes: [{ name: "AppDrawer" }],
  //             },
  //           },
  //         ],
  //       });
  //     }
  //   }
  // }

  //TODO:- Other Functions
  validation = () => {
    //Email Validation
    var isEmailCorrect = helper.checkEmail(this.state.email);
    if (this.state.name.length == 0) {
      this.setState({ is_error_msg_shown: true });
      return false;
    } else if (!isEmailCorrect) {
      this.setState({ is_error_msg_shown: true });
      return false;
    } else if (this.state.password.length == 0) {
      this.setState({ is_error_msg_shown: true });
      return false;
    } else {
      let request = {
        signup_type: "Account",
        name: this.state.name,
        email: this.state.email,
        countryCode: "+91",
        phone: this.state.cell_no,
        password: this.state.password,
        deviceId: "D12345",
        deviceToken: this.state.notification_token,
        deviceType: Platform.OS,
      };
      //this.props.register_user(request);
alert("Registered Successfully");
      return true;
    }
  };

  //TODO:- render event
  render() {
    return (
      <SafeAreaContainer
        title={this.state.title}
        bodyTxt={this.state.bodyTxt}
        isModalOpened={this.state.isPopUpOpened}
        onDismiss={() => {
          this.setState({ isPopUpOpened: false });
        }}
      >
        <Modal
          animated={false}
          animationType="none"
          transparent={true}
          visible={this.state.is_terms_modal_opened}
          onDismiss={() => {
            this.setState({ is_terms_modal_opened: false });
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.7)",
              padding: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                height: "95%",
                width: CONST.DEVICE_WIDTH - 40,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  backgroundColor: "#fff",
                  height: "92%",
                  width: CONST.DEVICE_WIDTH - 40,
                  borderRadius: 5,
                }}
              >
                <View style={{ width: "80%", marginLeft: 25 }}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 15,
                      color: "#000",
                      width: "80%",

                      fontWeight: "bold",
                      fontFamily: "Avenir",
                    }}
                  >
                  hfjhg
                  </Text>

                  {/* <HTML
                    source={{ html: this.props.get_faq_data.desc }}
                    imagesMaxWidth={Dimensions.get("window").width}
                  /> */}
                </View>
              </ScrollView>

              <TxtFullScreenBtn
                title={"CLOSE"}
                onPress={() => {
                  this.setState({ is_terms_modal_opened: false });
                }}
                disabled={false}
                containerStyle={{
                  backgroundColor: "#FF5C22",
                  marginTop: 5,
                  marginBottom: 10,
                }}
              />
            </View>
          </View>
        </Modal>
<ScrollView>
        <View>
          <Text
            style={{
              color: Colors.Black,
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: "Avenir",
              marginLeft: 25,
              marginTop: 70,
            }}
            allowFontScaling={false}
          >
            Sign Up with Account
          </Text>

          <View style={{ flexDirection: "row", marginLeft: 25, marginTop: 8 }}>
            <Text
              style={{ color: "#747A93", fontSize: 13 }}
              allowFontScaling={false}
            >
              By refistering you agree to the{" "}
            </Text>

            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => {
                //this.setState({ is_terms_modal_opened: true });
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: Colors.Black,
                  fontWeight: "bold",
                  textDecorationColor: Colors.Black,
                  textDecorationLine: "underline",
                }}
              >
                Terms of Use{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() =>
          {

           this.callPicker();
          }} style={{ backgroundColor: 'white', borderRadius: 100 / 2, alignSelf: 'center', marginTop: 10, }}>

          <Image style={{ width: 100, height: 100, borderRadius: 100 / 2, }}
                      source={this.state.selectedImg==""?images.profile:{uri:this.state.selectedImg}}
                      />
           <View style={{ backgroundColor: 'white', width: 30, height: 30, borderRadius: 15, position: 'absolute', right: 0, bottom: 10, justifyContent: 'center', borderColor: 'black', borderWidth: 1 }}>
                  <Image style={{ width: 20, height: 20, alignSelf: 'center' }} source={images.cam} resizeMode={'contain'} />
                </View>
                </TouchableOpacity>
          <HeaderTxt title={"Name"} marginTop={30} />
          <View
            style={{
              height: 54,
              width: "86%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 3,
            }}
          >
            <TextInput
              style={{
                height: 44,
                width: "100%",
                borderRadius: 5,
                borderColor: Colors.InputText,
                borderWidth: 1,
                paddingLeft: 10,
                fontSize: 14,
                color: Colors.Black,
              }}
              placeholder=""
              placeholderTextColor={Colors.Black}
              value={this.state.name}
              onChangeText={(text) => {
                this.setState({ name: text }, () => {
                  if (
                    this.state.name.length != 0 &&
                    this.state.email.length != 0 &&
                    this.state.password.length != 0
                  ) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
            />
          </View>
          <HeaderTxt title={"Email"} marginTop={10} />
          <View
            style={{
              height: 54,
              width: "86%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 3,
            }}
          >
            <TextInput
              style={{
                height: 44,
                width: "100%",
                borderRadius: 5,
                borderColor: this.state.is_error_msg_shown
                  ? Colors.pink
                  : Colors.InputText,
                borderWidth: 1,
                paddingLeft: 10,
                fontSize: 14,
                color: Colors.Black,
              }}
              placeholder=""
              autoCapitalize="none"
              placeholderTextColor={Colors.Black}
              value={this.state.email}
              onChangeText={(text) => {
                this.setState({ email: text }, () => {
                  if (
                    this.state.name.length != 0 &&
                    this.state.email.length != 0 &&
                    this.state.password.length != 0
                  ) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
              onBlur={() => {
                this.setState({ keyboardVerticalOffsetValue: 0 });
              }}
              onPressSubmit={() => {
                this.setState({ keyboardVerticalOffsetValue: 0 });
              }}
            />
          </View>

          <HeaderTxt title={"Password"} marginTop={10} />
          <View
            style={{
              height: 44,
              width: "86%",
              borderRadius: 5,
              borderColor: this.state.is_error_msg_shown
                ? Colors.pink
                : Colors.InputText,
              borderWidth: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 8,
            }}
          >
            <TextInput
              style={{
                height: 44,
                flex: 1,
                paddingLeft: 10,
                fontSize: 14,
                color: Colors.Black,
              }}
              placeholder=""
              placeholderTextColor={Colors.Black}
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({ password: text }, () => {
                  if (
                    this.state.name.length != 0 &&
                    this.state.email.length != 0 &&
                    this.state.password.length != 0
                  ) {
                    this.setState({ is_btn_disabled: false });
                  }
                });
              }}
              secureTextEntry={true}
              onFocus={() => {
                this.setState({ keyboardVerticalOffsetValue: 100 });
              }}
              onBlur={() => {
                this.setState({ keyboardVerticalOffsetValue: 0 });
              }}
              onPressSubmit={() => {
                this.setState({ keyboardVerticalOffsetValue: 0 });
              }}
            />
            {/* <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: "100%", width: 40, }}
                            onPress={() => {
                            }}>
                            <Image source={AssetsImages.icon_show_pwd} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                        </TouchableOpacity> */}
          </View>
          {this.state.is_error_msg_shown ? (
            <ErrorContainer error_msg={this.state.error_msg} />
          ) : null}
          <View style={{ flex: 1 }} />

          <SingleLineBtn
            txt={"Already have an account?"}
            btnTxt={" Login here"}
            onPress={() => {
              // this.props.navigation.goBack()
              this.props.navigation.navigate("Login");
            }}
            marginTop={20}
            // marginBottom={20}
          />

          <TxtFullScreenBtn
            title={"CREATE ACCOUNT"}
            onPress={() => {
              this.validation();

              // var data = {
              //   name: this.state.name,
              //   email: this.state.email,
              //   password: this.state.password,
              // };
              //   this.props.navigation.navigate("SignupCellNo", {
              //     sign_up_data: data,
              //   });
              // }
            }}
           // disabled={this.state.is_btn_disabled ? true : false}
            containerStyle={{
              backgroundColor: Colors.OrangeRed,
              // backgroundColor: this.state.is_btn_disabled
              //   ? Colors.disable
              //   : Colors.OrangeRed,
              marginTop: 25,
              marginBottom: 20,
            }}
          />
        </View>
    </ScrollView>
      </SafeAreaContainer>
    );
  }
}
// const mapDispatchToProps = (dispatch) => ({
//   register_user: (request_data) => dispatch(register_user(request_data)),
//   get_faq: (request_data) => dispatch(get_faq(request_data)),
// });

// const mapStateToProps = (state) => ({
//   is_success: state.user_register.is_success,
//   register_data: state.user_register.register_data,
//   is_fetching: state.user_register.is_fetching,
//   user_data: state.user_auth.user_data,
//   msg: state.user_register.msg,
//   error: state.user_register.error,

  

  
// });
export default Signup;
//export default connect(mapStateToProps, mapDispatchToProps)(Signup);