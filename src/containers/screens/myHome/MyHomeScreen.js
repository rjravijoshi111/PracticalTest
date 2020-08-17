import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, PermissionsAndroid, ToastAndroid, Platform } from 'react-native';
import globalsVariables from '@constant/globalsVariables';
import { Container, Text } from 'native-base';
import _HeaderComponent from '@component/_HeaderComponent';
import Language from '@src/config/localization';
import { connect } from 'react-redux';
import colors from '@constant/colors';
import * as MyHomeService from '@myHome/myHome.service';
import * as MyHomeAction from "@myHome/myHome.action";
import font from '@constant/font';
import Share from 'react-native-share';
import { requestCameraPermission } from '@config/helper';
import _VideoListingComponent from '@component/myHome/_VideoListingComponent';
import ImagePicker from 'react-native-image-crop-picker';
import _ImagePickerOptionModal from '../../component/myHome/_ImagePickerOptionModal';

const { shareVia, shareMsg } = Language.myHomeScreen
const shareOptions = {
    title: shareVia,
    message: shareMsg
};

class MyHomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onEndReachedCalledDuringMomentum: true,
            isImageOptionModalVisible: false,
            profileImageSource: ''
        }
        props.getVideoList();
    }

    /**
    * Call from Flat list momentScroll
    */
    _onMomentumScrollBegin = () => {
        this.setState({ onEndReachedCalledDuringMomentum: false })
    }

    /**
    * ListEmptyComponent  
    */
    listEmptyComponent = () => {
        const { noData } = Language;
        return (
            <View style={styles.noDataWrapper}>
                {!this.props.isLoading && <Text style={styles.rowTitleStyle}>{noData}</Text>}
            </View>
        )
    }

    /**
    * Render Card View 
    */
    renderCardListView = ({ item, index }) => {
        const data = item
        return (
            <_VideoListingComponent
                data={data}
                onLongPress={() => this.handleShareOptionPress(item)}
                onPlayButtonPress={() => this.onPlayButtonPress(item, index)}
            />
        );
    }

    /**
    * Play pause button press
    */
    onPlayButtonPress = (item, index) => {
        if (!item.isVideoPlaying) {
            const { videoList } = this.props;
            let tempVideoListData = videoList;
            tempVideoListData.forEach(element => {
                element.isVideoPlaying = false
            });

            tempVideoListData[index].isVideoPlaying = true;

            MyHomeAction.setVideoListItems(tempVideoListData);
            this.setState({})
        }
    }

    /**
    * On Video List end reached
    */
    onVideoListEndReached = () => {
        if (!this.state.onEndReachedCalledDuringMomentum) {
            this.setState({ onEndReachedCalledDuringMomentum: true }, () => {
                this.props.getVideoList(false, true)
            })
        }
    }

    /**
   * Pull to refresh
   */
    onRefresh = () => {
        this.props.getVideoList(true)
    }

    /**
    * Rendering listing footer to show loader
    */
    renderListFooter = () => {
        const { isPaginationCall } = this.props;
        return (
            <View style={styles.footerStyle}>
                {
                    (isPaginationCall)
                        ?
                        <ActivityIndicator color={colors.black} size={50} />
                        :
                        <View />
                }
            </View>
        )
    }

    /**
     * Handle Share on long press of card
     */
    handleShareOptionPress = (item) => {
        shareOptions.url = item.video_url
        Share.open(shareOptions)
            .then((res) => { console.log(res) })
            .catch((err) => { console.log(err); });
    }

    /**
    * * Handling profile option tap
    */
    handleProfileOptionPress = (isCameraOpenFlag) => {
        this.setState({ isImageOptionModalVisible: false });
        requestCameraPermission({
            success: (response) => {
                if (response === PermissionsAndroid.RESULTS.GRANTED) {
                    if (isCameraOpenFlag) {
                        ImagePicker.openCamera({
                            cropping: true,
                            width: globalsVariables.width,
                            height: globalsVariables.width
                        }).then((response) => {
                            let imageData = { uri: (Platform.OS === 'android') ? response.path : decodeURI(response.path) }
                            this.props.setUserProfileImage(imageData)
                        }).catch((error) => {
                            // console.log('ImagePicker openCamera Error: ', error)
                        });
                    } else {
                        ImagePicker.openPicker({
                            cropping: true,
                            width: globalsVariables.width,
                            height: globalsVariables.width
                        }).then((response) => {
                            let imageData = { uri: (Platform.OS === 'android') ? response.path : decodeURI(response.path) }
                            this.props.setUserProfileImage(imageData)
                        }).catch((error) => {
                            // console.log('ImagePicker openPicker Error: ', error)
                        });
                    }

                } else if (response === PermissionsAndroid.NEVER_ASK_AGAIN) {
                    ToastAndroid.show('Need camera permission!', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Camera Permission required to upload image', ToastAndroid.SHORT);
                }
            }
        })
    }

    render() {
        const { title, subTitle } = Language.myHomeScreen;
        const { videoList, isRefreshing } = this.props;
        const { isImageOptionModalVisible, profileImageSource } = this.state;

        const imagePickerPopUp = <_ImagePickerOptionModal
            isImageOptionModalVisible={isImageOptionModalVisible}
            onModalClose={() => this.setState({ isImageOptionModalVisible: false })}
            handleProfileOptionPress={(isCameraOpenFlag) => this.handleProfileOptionPress(isCameraOpenFlag)}
        />

        return (
            <Container style={styles.container}>
                {imagePickerPopUp}
                <_HeaderComponent
                    titleText={title}
                    subTitleText={subTitle}
                    onProfilePress={() => this.setState({ isImageOptionModalVisible: true })}
                    profileImageSource={this.props.userProfileImage}
                />

                <View style={styles.containerStyle}>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={videoList}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderCardListView}
                            onEndReachedThreshold={0.01}
                            onEndReached={this.onVideoListEndReached}
                            onMomentumScrollBegin={this._onMomentumScrollBegin}
                            ListEmptyComponent={this.listEmptyComponent()}
                            onRefresh={() => this.onRefresh()}
                            refreshing={isRefreshing}
                            ListFooterComponent={() => this.renderListFooter()}
                        />
                    </View>
                </View>

            </Container>
        );
    }
}

/**
 * Connection with Redux
 */
const mapStateToProps = state => ({
    userProfileImage: state.myHome.userProfileImage,
    videoList: state.myHome.videoList,
    updateListFlag: state.myHome.updateListFlag,
    isRefreshing: state.myHome.isRefreshing,
    isPaginationCall: state.myHome.isPaginationCall,
    isLoading: state.general.isLoading,
});

const mapDispatchToProps = dispatch => ({
    setUserProfileImage: (url) => dispatch(MyHomeAction.setUserProfileImage(url)),
    getVideoList: (isLoadRefresh, isPaginationCall) => dispatch(MyHomeService.getVideoList(isLoadRefresh, isPaginationCall))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyHomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    containerStyle: {
        flex: 1,
        paddingHorizontal: globalsVariables.width * 0.030,
        paddingTop: globalsVariables.width * 0.030,
    },
    listContainer: {
        flex: 1
    },
    noDataWrapper: {
        height: globalsVariables.height * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowTitleStyle: {
        fontSize: font.fontSize_14,
        color: colors.black,
        fontFamily: font.fontFamily_semi_bold,
    },

})