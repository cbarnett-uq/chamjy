import * as React from "react";
import { View } from "react-native";
import Svg, {Text, TSpan, Path} from "react-native-svg";
import { Colors, Fonts } from "../../services/StyleService";

export class Logo extends React.Component {
    render() {
        return (
            <View style={{
                aspectRatio: (100 / 85.869),
                width: "100%"
            }}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={"100%"}
                height={"100%"}
                viewBox={"0 0 100 85.869"}
                {...this.props}>
                <Text
                    transform="translate(50 79.869)"
                    fill={Colors.primary.mid}
                    stroke={Colors.primary.mid}
                    strokeMiterlimit={10}
                    fontSize={Fonts.logo.size}
                    fontFamily={Fonts.logo.family}
                    textAnchor={"middle"}
                    letterSpacing=".04em"
                    >
                    <TSpan x={0} y={0}>
                        {"Conductify"}
                    </TSpan>
                </Text>
                <Path
                    data-name="Path 103"
                    d="M42.495 6.768 74.789.085a4.048 4.048 0 0 1 4.866 3.964v15.289c0 9.118.088 18.236-.032 27.353-.095 7.2-8.065 11.912-14.556 8.7a7.367 7.367 0 0 1-4.415-7.632 7.551 7.551 0 0 1 5.5-6.917c8.1-2.811 7.934-2.8 8.107-11.447.074-3.7-1.015-4.793-4.8-4.825-2.532-.022-5.127.022-7.658.006a1.929 1.929 0 0 0-1.886 1.725c-.241 2.668 1.579 3.2 4.173 3.178 1.728-.013 4.154-.572 3.734 2.465a.964.964 0 0 1-.982.834c-4.364-.172-8.385.74-11.544 4.48a.962.962 0 0 1-1.7-.531l-.229-2.75a.959.959 0 0 0-.956-.88h-8.573a.962.962 0 0 0-.959.963c0 6.542.021 12.908-.006 19.272-.031 7.237-4.647 11.362-11.853 10.452-4.021-.508-6.613-2.92-7.053-6.963s1.545-6.9 5.387-8.3c2.484-.9 6.308-.9 7.253-2.585 1.368-2.437.812-6.03.834-9.132.058-7.883.038-15.767.029-23.851a6.311 6.311 0 0 1 5.025-6.185Zm13.693 13.048a2.455 2.455 0 0 0-2.379-2.415c-2.5-.077-2.7 1.628-2.667 4.274.024 1.742.095 2.646.026 4.653a2 2 0 0 0 .816 1.613 2.508 2.508 0 0 0 3.891-.534 1.565 1.565 0 0 0 .2-.6 65.433 65.433 0 0 0 .113-6.991Zm-11.721-.066c-1.857.515-1.533 2.2-1.478 6.512a2.709 2.709 0 0 0 3.4 2.62c1.881-.561 1.467-2.544 1.354-7.032-.052-2.193-1.792-2.512-3.276-2.1Zm25.157 2.932h1.1a1.775 1.775 0 0 0 1.687-1.225 6.14 6.14 0 0 0 .222-2.379v-2.57a2.315 2.315 0 0 0-3.14-2.178c-1.842.741-1.529 2.853-1.454 4.961.032.849-.061 3.391 1.585 3.391Zm-8.021-.088h1.137c1.451 0 1.725-1.5 1.723-1.964 0-.348-.009-1.085-.009-1.523 0-.413.015-.949-.005-1.6a1.837 1.837 0 0 0-2.1-1.7c-2.488.146-2.527 1.751-2.422 4 .075 1.502.227 2.787 1.677 2.787Z"
                    fill={Colors.primary.mid}/>
            </Svg>
            </View>
        );
    }
}

/* <Path
data-name="Path 103"
d="M42.495 6.768 74.789.085a4.048 4.048 0 0 1 4.866 3.964v15.289c0 9.118.088 18.236-.032 27.353-.095 7.2-8.065 11.912-14.556 8.7a7.367 7.367 0 0 1-4.415-7.632 7.551 7.551 0 0 1 5.5-6.917c8.1-2.811 7.934-2.8 8.107-11.447.074-3.7-1.015-4.793-4.8-4.825-2.532-.022-5.127.022-7.658.006a1.929 1.929 0 0 0-1.886 1.725c-.241 2.668 1.579 3.2 4.173 3.178 1.728-.013 4.154-.572 3.734 2.465a.964.964 0 0 1-.982.834c-4.364-.172-8.385.74-11.544 4.48a.962.962 0 0 1-1.7-.531l-.229-2.75a.959.959 0 0 0-.956-.88h-8.573a.962.962 0 0 0-.959.963c0 6.542.021 12.908-.006 19.272-.031 7.237-4.647 11.362-11.853 10.452-4.021-.508-6.613-2.92-7.053-6.963s1.545-6.9 5.387-8.3c2.484-.9 6.308-.9 7.253-2.585 1.368-2.437.812-6.03.834-9.132.058-7.883.038-15.767.029-23.851a6.311 6.311 0 0 1 5.025-6.185Zm13.693 13.048a2.455 2.455 0 0 0-2.379-2.415c-2.5-.077-2.7 1.628-2.667 4.274.024 1.742.095 2.646.026 4.653a2 2 0 0 0 .816 1.613 2.508 2.508 0 0 0 3.891-.534 1.565 1.565 0 0 0 .2-.6 65.433 65.433 0 0 0 .113-6.991Zm-11.721-.066c-1.857.515-1.533 2.2-1.478 6.512a2.709 2.709 0 0 0 3.4 2.62c1.881-.561 1.467-2.544 1.354-7.032-.052-2.193-1.792-2.512-3.276-2.1Zm25.157 2.932h1.1a1.775 1.775 0 0 0 1.687-1.225 6.14 6.14 0 0 0 .222-2.379v-2.57a2.315 2.315 0 0 0-3.14-2.178c-1.842.741-1.529 2.853-1.454 4.961.032.849-.061 3.391 1.585 3.391Zm-8.021-.088h1.137c1.451 0 1.725-1.5 1.723-1.964 0-.348-.009-1.085-.009-1.523 0-.413.015-.949-.005-1.6a1.837 1.837 0 0 0-2.1-1.7c-2.488.146-2.527 1.751-2.422 4 .075 1.502.227 2.787 1.677 2.787Z"
fill="#8a9e7e"/> */

/* <Text
                    transform="translate(1 79.869)"
                    fill="#8a9f7f"
                    stroke="#8a9f7f"
                    strokeMiterlimit={10}
                    fontSize={19}
                    fontFamily="SegoeUI, Segoe UI"
                    letterSpacing=".04em"
                    >
                    <TSpan x={0} y={0}>
                        {"Conductify"}
                    </TSpan>
                </Text> */