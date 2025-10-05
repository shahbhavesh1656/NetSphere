import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Circle, G } from 'react-native-svg';

const NetSphereLogo = ({ size = 256 }) => (
  <Svg width={size} height={size} viewBox="0 0 256 256">
    <Defs>
      <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#2D9CDB"/>
        <Stop offset="50%" stopColor="#9B51E0"/>
        <Stop offset="75%" stopColor="#00E5FF"/>
        <Stop offset="100%" stopColor="#FF2D95"/>
      </LinearGradient>
    </Defs>
    <G>
      <Circle cx="128" cy="128" r="90" fill="url(#grad)" opacity="0.9" />
      <Circle cx="128" cy="128" r="80" fill="none" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1" />
      <Circle cx="128" cy="128" r="60" fill="none" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1" />
      <Circle cx="128" cy="128" r="40" fill="none" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1" />
      <Circle cx="128" cy="128" r="6" fill="#FFFFFF" opacity="0.9" />
    </G>
  </Svg>
);

export default NetSphereLogo;

