# Nepali Date Picker 📅

A modern, beautifully crafted React date picker with seamless **Bikram Sambat (BS)** and **Anno Domini (AD)** calendar support.

[![npm version](https://img.shields.io/npm/v/@unholy_centipede/nepali-date-picker.svg)](https://www.npmjs.com/package/@unholy_centipede/nepali-date-picker)
[![npm downloads](https://img.shields.io/npm/dm/@unholy_centipede/nepali-date-picker.svg)](https://www.npmjs.com/package/@unholy_centipede/nepali-date-picker)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 📅 **Dual Calendar Support** - BS (Bikram Sambat) and AD (Anno Domini)
- 🔄 **Automatic Conversion** - Seamless date conversion between BS and AD
- 🔢 **Nepali Numerals** - Optional Nepali numeral display for authentic BS dates
- 🎨 **Multiple Themes** - Blue, Green, Purple, and Red themes
- 📱 **Responsive Design** - Mobile-friendly with modern UI/UX
- 💎 **TypeScript Support** - Full type definitions included
- ⚡ **Lightweight** - Minimal dependencies

## 📦 Installation

```bash
npm install @unholy_centipede/nepali-date-picker
```

or with yarn:

```bash
yarn add @unholy_centipede/nepali-date-picker
```

or with pnpm:

```bash
pnpm add @unholy_centipede/nepali-date-picker
```

## 🚀 Quick Start

```tsx
import { DatePicker } from "@unholy_centipede/nepali-date-picker";
import "@unholy_centipede/nepali-date-picker/styles.css";
import { useState } from "react";

function App() {
  const [date, setDate] = useState(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      calendarType="BS"
      placeholder="Select Nepali date"
      theme="blue"
      useNepaliNumerals={true}
    />
  );
}
```

## 📖 API Reference

### DatePicker Props

| Prop                | Type                                     | Default         | Description                        |
| ------------------- | ---------------------------------------- | --------------- | ---------------------------------- |
| `value`             | `DateObject \| null`                     | `null`          | The selected date value            |
| `onChange`          | `(date: DateObject \| null) => void`     | `() => {}`      | Callback when date changes         |
| `calendarType`      | `'BS' \| 'AD'`                           | `'BS'`          | Initial calendar type              |
| `placeholder`       | `string`                                 | `'Select date'` | Placeholder text                   |
| `useNepaliNumerals` | `boolean`                                | `true`          | Display Nepali numerals in BS mode |
| `theme`             | `'blue' \| 'green' \| 'purple' \| 'red'` | `'blue'`        | Color theme                        |
| `disabled`          | `boolean`                                | `false`         | Disable the date picker            |
| `className`         | `string`                                 | `''`            | Additional CSS class               |

### DateObject Type

```typescript
interface DateObject {
  year: number;
  month: number; // 0-indexed (0 = first month)
  day: number;
  calendarType: "BS" | "AD";
}
```

## 🎨 Themes

The component comes with four beautiful themes:

```tsx
// Blue theme (default)
<DatePicker theme="blue" />

// Green theme
<DatePicker theme="green" />

// Purple theme
<DatePicker theme="purple" />

// Red theme
<DatePicker theme="red" />
```

## 🔄 Calendar Types

### Bikram Sambat (BS) Calendar

```tsx
<DatePicker
  calendarType="BS"
  useNepaliNumerals={true}
  placeholder="नेपाली मिति छान्नुहोस्"
/>
```

### Anno Domini (AD) Calendar

```tsx
<DatePicker
  calendarType="AD"
  useNepaliNumerals={false}
  placeholder="Select English date"
/>
```

## 🛠️ Utility Functions

The package also exports utility functions for date conversion:

```typescript
import { adToBs, bsToAd } from "@unholy_centipede/nepali-date-picker";

// Convert AD to BS
const bsDate = adToBs(2024, 0, 15); // January 15, 2024
// Result: { year: 2080, month: 9, day: 1 }

// Convert BS to AD
const adDate = bsToAd(2080, 9, 1);
// Result: { year: 2024, month: 0, day: 15 }
```

## 📋 Exported Constants

```typescript
import {
  BS_MONTHS,
  AD_MONTHS,
  NEPALI_NUMERALS,
} from "@unholy_centipede/nepali-date-picker";

// BS_MONTHS - Array of Nepali month names
// AD_MONTHS - Array of English month names
// NEPALI_NUMERALS - Object mapping digits to Nepali numerals
```

## 🎯 Requirements

- React >= 18.0.0
- React DOM >= 18.0.0

## 📄 License

MIT © [Sakin Maharjan](https://github.com/sakinmaharjan)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sakinmaharjan/nepali-date-picker/issues).

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!
