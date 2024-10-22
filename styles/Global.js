import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';


export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;


export const colors = {
    BgColor: "#FFFFFF",
    primary: "#193B8B",
    success: "#50C878",
    Danger: "#FF6161",
    TextColor: "#202020",
    Secondary: "#807272",
    Dark: "#000000",
    InActive: "#C6DFE6",
    DarkText: "#000000",
    LightText: "#FFFFFF",
    placeholder: "#C6DFE6",
    borderColor: "#807272",
    light: "#E4F1F5"
}


export const widthStyles = {};
for (let i = 5; i <= 100; i += 5) {
    widthStyles[`w_${i}`] = {
        width: windowWidth * (i / 100),
    };
}

export const width = StyleSheet.create(widthStyles);


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale;

    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 8;
    }
}


export const FontSizes = {
    extraSmall: normalize(14),    // Small font size
    SecondSmall: normalize(16),    // Small font size
    small: normalize(18),    // Small font size
    normal: normalize(20),  // Regular font size
    regular: normalize(24),  // Regular font size
    medium: normalize(28),   // Medium font size
    large: normalize(32),    // Large font size
    extraLarge: normalize(36), // Extra large font size
};

export const inputFeilds = StyleSheet.create({
    inputType_1: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        fontSize: FontSizes.normal,
    },
    inputType_2: {
        paddingHorizontal: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: 6,
        fontSize: FontSizes.small,
        borderColor: colors.DarkText,
        borderWidth: 0.5,
        height: 35,
        textAlign: "center",
        paddingVertical: 0,
        width: 55
    }
})


export const boxShadow = StyleSheet.create({
    basicShadow: {
        // backgroundColor: '#fff',
        shadowColor: "#AAA",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    basicShadowreverse: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    whiteShadow: {
        shadowColor: "#FFF",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})


export const InputFieldIcon = StyleSheet.create({
    iconHolder: {
        position: "relative"
    },
    icon: {
        position: "absolute",
        top: "50%",
        right: 25,
        transform: [{ translateY: -0.5 }]
    },
})


function normalizeMargins(size) {
    return Math.round(size * scale);
}

export const Margins = {
    m_s: normalizeMargins(4),
    m_m: normalizeMargins(8),
    m_l: normalizeMargins(12),
    m_xl: normalizeMargins(16),
    m_xxl: normalizeMargins(20),
    m_2xxl: normalizeMargins(40),// XX-Large 
};

export const Padding = {
    p_s: normalizeMargins(4),   // Small
    p_m: normalizeMargins(8),   // Medium
    p_l: normalizeMargins(12),  // Large
    p_xl: normalizeMargins(16), // Extra Large
    p_xxl: normalizeMargins(20),// XX-Large 
    p_2xxl: normalizeMargins(40),// XX-Large 
}

export const buttons = StyleSheet.create({
    PrimaryButtom: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        flexDirection: "row"
    },
    whiteButtom: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.BgColor,
        paddingVertical: 15,
        borderRadius: 8,
        flexDirection: "row"
    },
    buttonsText: {
        fontSize: FontSizes.normal,
        textAlign: "center",
        color: colors.LightText,
        fontWeight: "500",
        textTransform: "uppercase"
    },
    whiteButtonsText: {
        fontSize: FontSizes.normal,
        textAlign: "center",
        color: colors.DarkText,
        fontWeight: "500",
        textTransform: "uppercase"
    },
    CheckInbtn: {
        backgroundColor: colors.success,
        padding: 15,
        borderRadius: 10
    },
    CheckOutbtn: {
        backgroundColor: colors.Danger,
        padding: 15,
        borderRadius: 10
    },
    CheckInbtntxt: {
        color: colors.LightText
    }
})


export const defaultTexts = StyleSheet.create({
    homeSubtitle: {
        fontSize: FontSizes.regular,
        color: colors.TextColor,
        fontWeight: "700"
    },
    homeMainText: {
        fontSize: FontSizes.extraLarge,
        color: colors.primary,
        fontWeight: "800"
    },
    checkinCardsubText: {
        fontSize: FontSizes.small,
        color: colors.Secondary,
        fontWeight: "400",
        width: "95%",
    },
    checkinCardMainText: {
        fontSize: FontSizes.regular,
        color: colors.TextColor,
        fontWeight: "700"
    },
    skipText: {
        textAlign: "center",
        color: colors.LightText,
        marginTop: 25,
        fontSize: FontSizes.normal
    },
    navigationSubtitle: {
        fontSize: FontSizes.small,
        color: colors.TextColor,
        fontWeight: "700"
    },
    navigationMainText: {
        fontSize: FontSizes.medium,
        color: colors.primary,
        fontWeight: "800"
    },
    planMainText: {
        fontSize: FontSizes.normal,
        color: colors.primary,
        fontWeight: "800"
    },
    normalLabels: {
        fontSize: FontSizes.small,
        color: colors.DarkText,
        fontWeight: "500"
    },
    memberName: {
        fontSize: FontSizes.normal,
        fontWeight: "bold",
        color: colors.DarkText
    },
    SuccessText: {
        fontSize: FontSizes.small,
        color: colors.borderColor
    }

})

export const flexBox = StyleSheet.create({
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    rowBetween: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    colBetween: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column"
    },
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    end: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    }
})

// export const windowWidth = Dimensions.get('window').width;
// export  const windowHeight = Dimensions.get('window').height;