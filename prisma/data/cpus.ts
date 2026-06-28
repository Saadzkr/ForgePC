type CpuEntry = [name: string, model: string, price: number, wattage: number, socket: string, cores: number, threads: number, baseGhz: number, boostGhz: number, score: number]

export const INTEL_CPUS: CpuEntry[] = [
  // ─── 1st Gen Nehalem (LGA1156 / LGA1366) ───
  ['Intel Core i3-530', 'Core i3', 65, 73, 'LGA1156', 2, 4, 2.93, 0, 12],
  ['Intel Core i3-540', 'Core i3', 70, 73, 'LGA1156', 2, 4, 3.06, 0, 13],
  ['Intel Core i5-650', 'Core i5', 80, 73, 'LGA1156', 2, 4, 3.2, 3.46, 18],
  ['Intel Core i5-750', 'Core i5', 95, 95, 'LGA1156', 4, 4, 2.67, 3.2, 22],
  ['Intel Core i7-860', 'Core i7', 140, 95, 'LGA1156', 4, 8, 2.8, 3.46, 28],
  ['Intel Core i7-920', 'Core i7', 175, 130, 'LGA1366', 4, 8, 2.67, 2.93, 27],
  ['Intel Core i7-950', 'Core i7', 200, 130, 'LGA1366', 4, 8, 3.06, 3.33, 29],
  ['Intel Core i7-980X', 'Core i7 Extreme', 300, 130, 'LGA1366', 6, 12, 3.33, 3.6, 35],
  ['Intel Core i7-990X', 'Core i7 Extreme', 350, 130, 'LGA1366', 6, 12, 3.47, 3.73, 37],

  // ─── 2nd Gen Sandy Bridge (LGA1155) ───
  ['Intel Core i3-2100', 'Core i3', 75, 65, 'LGA1155', 2, 4, 3.1, 0, 20],
  ['Intel Core i3-2120', 'Core i3', 80, 65, 'LGA1155', 2, 4, 3.3, 0, 21],
  ['Intel Core i5-2400', 'Core i5', 100, 95, 'LGA1155', 4, 4, 3.1, 3.4, 30],
  ['Intel Core i5-2500K', 'Core i5', 120, 95, 'LGA1155', 4, 4, 3.3, 3.7, 33],
  ['Intel Core i7-2600K', 'Core i7', 160, 95, 'LGA1155', 4, 8, 3.4, 3.8, 39],
  ['Intel Core i7-2700K', 'Core i7', 170, 95, 'LGA1155', 4, 8, 3.5, 3.9, 40],

  // ─── 3rd Gen Ivy Bridge (LGA1155) ───
  ['Intel Core i3-3220', 'Core i3', 70, 55, 'LGA1155', 2, 4, 3.3, 0, 24],
  ['Intel Core i5-3470', 'Core i5', 95, 77, 'LGA1155', 4, 4, 3.2, 3.6, 35],
  ['Intel Core i5-3570K', 'Core i5', 110, 77, 'LGA1155', 4, 4, 3.4, 3.8, 37],
  ['Intel Core i7-3770K', 'Core i7', 155, 77, 'LGA1155', 4, 8, 3.5, 3.9, 43],

  // ─── 4th Gen Haswell (LGA1150) ───
  ['Intel Core i3-4130', 'Core i3', 65, 54, 'LGA1150', 2, 4, 3.4, 0, 28],
  ['Intel Core i3-4160', 'Core i3', 70, 54, 'LGA1150', 2, 4, 3.6, 0, 29],
  ['Intel Core i5-4440', 'Core i5', 95, 84, 'LGA1150', 4, 4, 3.1, 3.3, 38],
  ['Intel Core i5-4460', 'Core i5', 100, 84, 'LGA1150', 4, 4, 3.2, 3.4, 39],
  ['Intel Core i5-4590', 'Core i5', 105, 84, 'LGA1150', 4, 4, 3.3, 3.7, 40],
  ['Intel Core i5-4670K', 'Core i5', 115, 84, 'LGA1150', 4, 4, 3.4, 3.8, 42],
  ['Intel Core i5-4690K', 'Core i5', 120, 88, 'LGA1150', 4, 4, 3.5, 3.9, 43],
  ['Intel Core i7-4770K', 'Core i7', 170, 84, 'LGA1150', 4, 8, 3.5, 3.9, 48],
  ['Intel Core i7-4790K', 'Core i7', 180, 88, 'LGA1150', 4, 8, 4.0, 4.4, 51],

  // ─── 5th Gen Broadwell (LGA1150) ───
  ['Intel Core i5-5675C', 'Core i5', 125, 65, 'LGA1150', 4, 4, 3.1, 3.6, 42],
  ['Intel Core i7-5775C', 'Core i7', 185, 65, 'LGA1150', 4, 8, 3.3, 3.7, 49],

  // ─── 6th Gen Skylake (LGA1151) ───
  ['Intel Core i3-6100', 'Core i3', 65, 51, 'LGA1151', 2, 4, 3.7, 0, 34],
  ['Intel Core i5-6400', 'Core i5', 95, 65, 'LGA1151', 4, 4, 2.7, 3.3, 43],
  ['Intel Core i5-6500', 'Core i5', 100, 65, 'LGA1151', 4, 4, 3.2, 3.6, 46],
  ['Intel Core i5-6600K', 'Core i5', 115, 91, 'LGA1151', 4, 4, 3.5, 3.9, 48],
  ['Intel Core i7-6700K', 'Core i7', 170, 91, 'LGA1151', 4, 8, 4.0, 4.2, 56],

  // ─── 7th Gen Kaby Lake (LGA1151) ───
  ['Intel Core i3-7100', 'Core i3', 60, 51, 'LGA1151', 2, 4, 3.9, 0, 38],
  ['Intel Core i5-7400', 'Core i5', 95, 65, 'LGA1151', 4, 4, 3.0, 3.5, 48],
  ['Intel Core i5-7500', 'Core i5', 100, 65, 'LGA1151', 4, 4, 3.4, 3.8, 50],
  ['Intel Core i5-7600K', 'Core i5', 115, 91, 'LGA1151', 4, 4, 3.8, 4.2, 52],
  ['Intel Core i7-7700K', 'Core i7', 170, 91, 'LGA1151', 4, 8, 4.2, 4.5, 59],

  // ─── 8th Gen Coffee Lake (LGA1151v2) ───
  ['Intel Core i3-8100', 'Core i3', 60, 65, 'LGA1151v2', 4, 4, 3.6, 0, 46],
  ['Intel Core i5-8400', 'Core i5', 100, 65, 'LGA1151v2', 6, 6, 2.8, 4.0, 58],
  ['Intel Core i5-8600K', 'Core i5', 125, 95, 'LGA1151v2', 6, 6, 3.6, 4.3, 62],
  ['Intel Core i7-8700K', 'Core i7', 170, 95, 'LGA1151v2', 6, 12, 3.7, 4.7, 69],

  // ─── 9th Gen Coffee Lake Refresh (LGA1151v2) ───
  ['Intel Core i3-9100F', 'Core i3', 55, 65, 'LGA1151v2', 4, 4, 3.6, 4.2, 49],
  ['Intel Core i5-9400F', 'Core i5', 90, 65, 'LGA1151v2', 6, 6, 2.9, 4.1, 60],
  ['Intel Core i5-9600K', 'Core i5', 120, 95, 'LGA1151v2', 6, 6, 3.7, 4.6, 65],
  ['Intel Core i7-9700K', 'Core i7', 170, 95, 'LGA1151v2', 8, 8, 3.6, 4.9, 72],
  ['Intel Core i9-9900K', 'Core i9', 220, 95, 'LGA1151v2', 8, 16, 3.6, 5.0, 78],
  ['Intel Core i9-9900KS', 'Core i9', 250, 127, 'LGA1151v2', 8, 16, 4.0, 5.0, 80],

  // ─── 10th Gen Comet Lake (LGA1200) ───
  ['Intel Core i3-10100', 'Core i3', 65, 65, 'LGA1200', 4, 8, 3.6, 4.3, 56],
  ['Intel Core i3-10100F', 'Core i3', 55, 65, 'LGA1200', 4, 8, 3.6, 4.3, 56],
  ['Intel Core i5-10400', 'Core i5', 95, 65, 'LGA1200', 6, 12, 2.9, 4.3, 67],
  ['Intel Core i5-10400F', 'Core i5', 85, 65, 'LGA1200', 6, 12, 2.9, 4.3, 67],
  ['Intel Core i5-10600K', 'Core i5', 125, 125, 'LGA1200', 6, 12, 4.1, 4.8, 72],
  ['Intel Core i7-10700K', 'Core i7', 170, 125, 'LGA1200', 8, 16, 3.8, 5.1, 78],
  ['Intel Core i9-10900K', 'Core i9', 230, 125, 'LGA1200', 10, 20, 3.7, 5.3, 83],

  // ─── 11th Gen Rocket Lake (LGA1200) ───
  ['Intel Core i5-11400', 'Core i5', 95, 65, 'LGA1200', 6, 12, 2.6, 4.4, 70],
  ['Intel Core i5-11400F', 'Core i5', 85, 65, 'LGA1200', 6, 12, 2.6, 4.4, 70],
  ['Intel Core i5-11600K', 'Core i5', 125, 125, 'LGA1200', 6, 12, 3.9, 4.9, 74],
  ['Intel Core i7-11700K', 'Core i7', 170, 125, 'LGA1200', 8, 16, 3.6, 5.0, 79],
  ['Intel Core i9-11900K', 'Core i9', 230, 125, 'LGA1200', 8, 16, 3.5, 5.3, 82],

  // ─── 12th Gen Alder Lake (LGA1700) ───
  ['Intel Core i3-12100', 'Core i3', 65, 60, 'LGA1700', 4, 8, 3.3, 4.3, 64],
  ['Intel Core i3-12100F', 'Core i3', 55, 60, 'LGA1700', 4, 8, 3.3, 4.3, 64],
  ['Intel Core i5-12400', 'Core i5', 100, 65, 'LGA1700', 6, 12, 2.5, 4.4, 75],
  ['Intel Core i5-12400F', 'Core i5', 90, 65, 'LGA1700', 6, 12, 2.5, 4.4, 75],
  ['Intel Core i5-12600K', 'Core i5', 130, 125, 'LGA1700', 10, 16, 3.7, 4.9, 84],
  ['Intel Core i7-12700K', 'Core i7', 175, 125, 'LGA1700', 12, 20, 3.6, 5.0, 88],
  ['Intel Core i9-12900K', 'Core i9', 230, 125, 'LGA1700', 16, 24, 3.2, 5.2, 92],
  ['Intel Core i9-12900KS', 'Core i9', 260, 150, 'LGA1700', 16, 24, 3.4, 5.5, 94],

  // ─── 13th Gen Raptor Lake (LGA1700) ───
  ['Intel Core i3-13100', 'Core i3', 65, 60, 'LGA1700', 4, 8, 3.4, 4.5, 66],
  ['Intel Core i3-13100F', 'Core i3', 55, 60, 'LGA1700', 4, 8, 3.4, 4.5, 66],
  ['Intel Core i5-13400', 'Core i5', 105, 65, 'LGA1700', 10, 16, 2.5, 4.6, 80],
  ['Intel Core i5-13400F', 'Core i5', 95, 65, 'LGA1700', 10, 16, 2.5, 4.6, 80],
  ['Intel Core i5-13600K', 'Core i5', 135, 125, 'LGA1700', 14, 20, 3.5, 5.1, 89],
  ['Intel Core i7-13700K', 'Core i7', 180, 125, 'LGA1700', 16, 24, 3.4, 5.4, 93],
  ['Intel Core i9-13900K', 'Core i9', 240, 125, 'LGA1700', 24, 32, 3.0, 5.8, 97],
  ['Intel Core i9-13900KS', 'Core i9', 270, 150, 'LGA1700', 24, 32, 3.2, 6.0, 99],

  // ─── 14th Gen Raptor Lake Refresh (LGA1700) ───
  ['Intel Core i3-14100', 'Core i3', 65, 60, 'LGA1700', 4, 8, 3.5, 4.7, 68],
  ['Intel Core i3-14100F', 'Core i3', 55, 60, 'LGA1700', 4, 8, 3.5, 4.7, 68],
  ['Intel Core i5-14400', 'Core i5', 110, 65, 'LGA1700', 10, 16, 2.5, 4.7, 81],
  ['Intel Core i5-14400F', 'Core i5', 100, 65, 'LGA1700', 10, 16, 2.5, 4.7, 81],
  ['Intel Core i5-14600K', 'Core i5', 140, 125, 'LGA1700', 14, 20, 3.5, 5.3, 90],
  ['Intel Core i5-14600KF', 'Core i5', 135, 125, 'LGA1700', 14, 20, 3.5, 5.3, 90],
  ['Intel Core i7-14700K', 'Core i7', 185, 125, 'LGA1700', 20, 28, 3.4, 5.6, 95],
  ['Intel Core i7-14700KF', 'Core i7', 180, 125, 'LGA1700', 20, 28, 3.4, 5.6, 95],
  ['Intel Core i9-14900K', 'Core i9', 250, 125, 'LGA1700', 24, 32, 3.2, 6.0, 98],
  ['Intel Core i9-14900KF', 'Core i9', 245, 125, 'LGA1700', 24, 32, 3.2, 6.0, 98],
  ['Intel Core i9-14900KS', 'Core i9', 280, 150, 'LGA1700', 24, 32, 3.2, 6.2, 100],
]

export const AMD_CPUS: CpuEntry[] = [
  // ─── Phenom II (AM3) ───
  ['AMD Phenom II X4 945', 'Phenom II', 80, 95, 'AM3', 4, 4, 3.0, 0, 16],
  ['AMD Phenom II X4 955', 'Phenom II', 90, 125, 'AM3', 4, 4, 3.2, 0, 17],
  ['AMD Phenom II X4 965', 'Phenom II', 95, 125, 'AM3', 4, 4, 3.4, 0, 18],
  ['AMD Phenom II X6 1055T', 'Phenom II', 130, 125, 'AM3', 6, 6, 2.8, 3.3, 24],
  ['AMD Phenom II X6 1090T', 'Phenom II', 150, 125, 'AM3', 6, 6, 3.2, 3.6, 26],
  ['AMD Phenom II X6 1100T', 'Phenom II', 160, 125, 'AM3', 6, 6, 3.3, 3.7, 27],

  // ─── FX Series (AM3+) ───
  ['AMD FX-4100', 'FX', 70, 95, 'AM3+', 4, 4, 3.6, 3.8, 22],
  ['AMD FX-4300', 'FX', 75, 95, 'AM3+', 4, 4, 3.8, 4.0, 24],
  ['AMD FX-6300', 'FX', 80, 95, 'AM3+', 6, 6, 3.5, 4.1, 28],
  ['AMD FX-6350', 'FX', 85, 125, 'AM3+', 6, 6, 3.9, 4.2, 29],
  ['AMD FX-8150', 'FX', 110, 125, 'AM3+', 8, 8, 3.6, 4.2, 32],
  ['AMD FX-8320', 'FX', 100, 125, 'AM3+', 8, 8, 3.5, 4.0, 33],
  ['AMD FX-8350', 'FX', 110, 125, 'AM3+', 8, 8, 4.0, 4.2, 35],
  ['AMD FX-9590', 'FX', 160, 220, 'AM3+', 8, 8, 4.7, 5.0, 38],

  // ─── A-Series APU (FM2/FM2+) ───
  ['AMD A8-5600K', 'A-Series', 70, 100, 'FM2', 4, 4, 3.6, 3.9, 18],
  ['AMD A10-5800K', 'A-Series', 85, 100, 'FM2', 4, 4, 3.8, 4.2, 22],
  ['AMD A10-7850K', 'A-Series', 85, 95, 'FM2+', 4, 4, 3.7, 4.0, 26],
  ['AMD A10-7870K', 'A-Series', 90, 95, 'FM2+', 4, 4, 3.9, 4.1, 27],

  // ─── Ryzen 1000 Zen 1 (AM4) ───
  ['AMD Ryzen 3 1200', 'Ryzen 3', 65, 65, 'AM4', 4, 4, 3.1, 3.4, 40],
  ['AMD Ryzen 3 1300X', 'Ryzen 3', 75, 65, 'AM4', 4, 4, 3.5, 3.7, 42],
  ['AMD Ryzen 5 1400', 'Ryzen 5', 85, 65, 'AM4', 4, 8, 3.2, 3.4, 46],
  ['AMD Ryzen 5 1600', 'Ryzen 5', 110, 65, 'AM4', 6, 12, 3.2, 3.6, 54],
  ['AMD Ryzen 5 1600X', 'Ryzen 5', 120, 95, 'AM4', 6, 12, 3.6, 4.0, 56],
  ['AMD Ryzen 7 1700', 'Ryzen 7', 150, 65, 'AM4', 8, 16, 3.0, 3.7, 60],
  ['AMD Ryzen 7 1700X', 'Ryzen 7', 170, 95, 'AM4', 8, 16, 3.4, 3.8, 62],
  ['AMD Ryzen 7 1800X', 'Ryzen 7', 190, 95, 'AM4', 8, 16, 3.6, 4.0, 64],

  // ─── Ryzen 2000 Zen+ (AM4) ───
  ['AMD Ryzen 3 2200G', 'Ryzen 3', 65, 65, 'AM4', 4, 4, 3.5, 3.7, 44],
  ['AMD Ryzen 5 2400G', 'Ryzen 5', 95, 65, 'AM4', 4, 8, 3.6, 3.9, 52],
  ['AMD Ryzen 5 2600', 'Ryzen 5', 110, 65, 'AM4', 6, 12, 3.4, 3.9, 58],
  ['AMD Ryzen 5 2600X', 'Ryzen 5', 125, 95, 'AM4', 6, 12, 3.6, 4.2, 60],
  ['AMD Ryzen 7 2700', 'Ryzen 7', 150, 65, 'AM4', 8, 16, 3.2, 4.1, 65],
  ['AMD Ryzen 7 2700X', 'Ryzen 7', 170, 105, 'AM4', 8, 16, 3.7, 4.3, 68],

  // ─── Ryzen 3000 Zen 2 (AM4) ───
  ['AMD Ryzen 3 3100', 'Ryzen 3', 65, 65, 'AM4', 4, 8, 3.6, 3.9, 54],
  ['AMD Ryzen 3 3300X', 'Ryzen 3', 75, 65, 'AM4', 4, 8, 3.8, 4.3, 57],
  ['AMD Ryzen 5 3400G', 'Ryzen 5', 95, 65, 'AM4', 4, 8, 3.7, 4.2, 56],
  ['AMD Ryzen 5 3600', 'Ryzen 5', 110, 65, 'AM4', 6, 12, 3.6, 4.2, 68],
  ['AMD Ryzen 5 3600X', 'Ryzen 5', 130, 95, 'AM4', 6, 12, 3.8, 4.4, 70],
  ['AMD Ryzen 7 3700X', 'Ryzen 7', 160, 65, 'AM4', 8, 16, 3.6, 4.4, 76],
  ['AMD Ryzen 7 3800X', 'Ryzen 7', 180, 105, 'AM4', 8, 16, 3.9, 4.5, 78],
  ['AMD Ryzen 9 3900X', 'Ryzen 9', 220, 105, 'AM4', 12, 24, 3.8, 4.6, 84],
  ['AMD Ryzen 9 3950X', 'Ryzen 9', 280, 105, 'AM4', 16, 32, 3.5, 4.7, 89],

  // ─── Ryzen 5000 Zen 3 (AM4) ───
  ['AMD Ryzen 5 5500', 'Ryzen 5', 95, 65, 'AM4', 6, 12, 3.6, 4.2, 72],
  ['AMD Ryzen 5 5600', 'Ryzen 5', 110, 65, 'AM4', 6, 12, 3.5, 4.4, 76],
  ['AMD Ryzen 5 5600X', 'Ryzen 5', 130, 65, 'AM4', 6, 12, 3.7, 4.6, 80],
  ['AMD Ryzen 5 5600G', 'Ryzen 5', 120, 65, 'AM4', 6, 12, 3.9, 4.4, 75],
  ['AMD Ryzen 7 5700G', 'Ryzen 7', 160, 65, 'AM4', 8, 16, 3.8, 4.6, 82],
  ['AMD Ryzen 7 5700X', 'Ryzen 7', 170, 65, 'AM4', 8, 16, 3.4, 4.6, 84],
  ['AMD Ryzen 7 5700X3D', 'Ryzen 7', 190, 105, 'AM4', 8, 16, 3.0, 4.1, 86],
  ['AMD Ryzen 7 5800X', 'Ryzen 7', 200, 105, 'AM4', 8, 16, 3.8, 4.7, 88],
  ['AMD Ryzen 7 5800X3D', 'Ryzen 7', 230, 105, 'AM4', 8, 16, 3.4, 4.5, 92],
  ['AMD Ryzen 9 5900X', 'Ryzen 9', 260, 105, 'AM4', 12, 24, 3.7, 4.8, 93],
  ['AMD Ryzen 9 5950X', 'Ryzen 9', 300, 105, 'AM4', 16, 32, 3.4, 4.9, 96],

  // ─── Ryzen 7000 Zen 4 (AM5) ───
  ['AMD Ryzen 5 7500F', 'Ryzen 5', 115, 65, 'AM5', 6, 12, 3.7, 5.0, 80],
  ['AMD Ryzen 5 7600', 'Ryzen 5', 130, 65, 'AM5', 6, 12, 3.8, 5.1, 82],
  ['AMD Ryzen 5 7600X', 'Ryzen 5', 150, 105, 'AM5', 6, 12, 4.7, 5.3, 85],
  ['AMD Ryzen 7 7700', 'Ryzen 7', 170, 65, 'AM5', 8, 16, 3.8, 5.3, 88],
  ['AMD Ryzen 7 7700X', 'Ryzen 7', 190, 105, 'AM5', 8, 16, 4.5, 5.4, 90],
  ['AMD Ryzen 7 7800X3D', 'Ryzen 7', 220, 120, 'AM5', 8, 16, 4.2, 5.0, 95],
  ['AMD Ryzen 9 7900', 'Ryzen 9', 230, 65, 'AM5', 12, 24, 3.7, 5.4, 92],
  ['AMD Ryzen 9 7900X', 'Ryzen 9', 260, 170, 'AM5', 12, 24, 4.7, 5.6, 94],
  ['AMD Ryzen 9 7950X', 'Ryzen 9', 300, 170, 'AM5', 16, 32, 4.5, 5.7, 97],
  ['AMD Ryzen 9 7950X3D', 'Ryzen 9', 350, 120, 'AM5', 16, 32, 4.2, 5.7, 99],
]

export function buildCpu(name: string, brand: string, e: CpuEntry) {
  return {
    name,
    category: 'CPU' as const,
    brand,
    model: e[1],
    price: e[2],
    wattage: e[3],
    specs: {
      cores: e[5],
      threads: e[6],
      baseClock: e[7],
      boostClock: e[8] || null,
      socket: e[4],
      tdp: e[3],
      performanceScore: e[9],
    },
    imageUrl: null as string | null,
    inStock: true,
  }
}
