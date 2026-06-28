import { PrismaClient } from '@prisma/client'
import { INTEL_CPUS, AMD_CPUS, buildCpu } from './data/cpus'
import { NVIDIA_GPUS, AMD_GPUS, buildGpu } from './data/gpus'

const prisma = new PrismaClient()

type ComponentInput = {
  name: string
  category: string
  brand: string
  model: string
  price: number
  wattage: number
  specs: Record<string, unknown>
  imageUrl: string | null
  inStock?: boolean
}

const components: ComponentInput[] = [
  ...INTEL_CPUS.map(e => buildCpu(e[0], 'Intel', e)),
  ...AMD_CPUS.map(e => buildCpu(e[0], 'AMD', e)),
  ...NVIDIA_GPUS.map(e => buildGpu(e[0], 'NVIDIA', e)),
  ...AMD_GPUS.map(e => buildGpu(e[0], 'AMD', e)),

  // ─── Motherboards (AM5) ───
  { name: 'ASUS ROG Crosshair X670E Hero', category: 'MOTHERBOARD', brand: 'ASUS', model: 'ROG Crosshair X670E Hero', price: 699, wattage: 30, specs: { socket: 'AM5', chipset: 'X670E', ramType: 'DDR5', maxRam: 192, formFactor: 'ATX', maxTdp: 230 }, imageUrl: null },
  { name: 'ASUS ROG Strix X670E-E Gaming', category: 'MOTHERBOARD', brand: 'ASUS', model: 'ROG Strix X670E-E', price: 499, wattage: 25, specs: { socket: 'AM5', chipset: 'X670E', ramType: 'DDR5', maxRam: 128, formFactor: 'ATX', maxTdp: 210 }, imageUrl: null },
  { name: 'MSI MPG X670E Carbon WiFi', category: 'MOTHERBOARD', brand: 'MSI', model: 'MPG X670E Carbon', price: 479, wattage: 25, specs: { socket: 'AM5', chipset: 'X670E', ramType: 'DDR5', maxRam: 192, formFactor: 'ATX', maxTdp: 210 }, imageUrl: null },
  { name: 'Gigabyte X670 Aorus Elite AX', category: 'MOTHERBOARD', brand: 'Gigabyte', model: 'X670 Aorus Elite', price: 299, wattage: 20, specs: { socket: 'AM5', chipset: 'X670', ramType: 'DDR5', maxRam: 128, formFactor: 'ATX', maxTdp: 200 }, imageUrl: null },
  { name: 'ASUS ROG Strix B650E-F Gaming', category: 'MOTHERBOARD', brand: 'ASUS', model: 'ROG Strix B650E-F', price: 259, wattage: 20, specs: { socket: 'AM5', chipset: 'B650E', ramType: 'DDR5', maxRam: 128, formFactor: 'ATX', maxTdp: 200 }, imageUrl: null },
  { name: 'MSI MAG B650 Tomahawk WiFi', category: 'MOTHERBOARD', brand: 'MSI', model: 'MAG B650 Tomahawk', price: 229, wattage: 20, specs: { socket: 'AM5', chipset: 'B650', ramType: 'DDR5', maxRam: 128, formFactor: 'ATX', maxTdp: 190 }, imageUrl: null },
  { name: 'Gigabyte B650 Aorus Elite AX', category: 'MOTHERBOARD', brand: 'Gigabyte', model: 'B650 Aorus Elite', price: 209, wattage: 20, specs: { socket: 'AM5', chipset: 'B650', ramType: 'DDR5', maxRam: 128, formFactor: 'ATX', maxTdp: 180 }, imageUrl: null },
  { name: 'ASRock B650m Pro RS WiFi', category: 'MOTHERBOARD', brand: 'ASRock', model: 'B650m Pro RS', price: 159, wattage: 15, specs: { socket: 'AM5', chipset: 'B650', ramType: 'DDR5', maxRam: 128, formFactor: 'mATX', maxTdp: 180 }, imageUrl: null },
  { name: 'ASUS ROG Strix B650E-I Gaming WiFi', category: 'MOTHERBOARD', brand: 'ASUS', model: 'ROG Strix B650E-I', price: 329, wattage: 15, specs: { socket: 'AM5', chipset: 'B650E', ramType: 'DDR5', maxRam: 96, formFactor: 'ITX', maxTdp: 170 }, imageUrl: null },

  // ─── Motherboards (LGA1700) ───
  { name: 'ASUS ROG Maximus Z790 Hero', category: 'MOTHERBOARD', brand: 'ASUS', model: 'ROG Maximus Z790 Hero', price: 629, wattage: 30, specs: { socket: 'LGA1700', chipset: 'Z790', ramType: 'DDR5', maxRam: 192, formFactor: 'ATX', maxTdp: 280 }, imageUrl: null },
  { name: 'MSI MPG Z790 Carbon WiFi', category: 'MOTHERBOARD', brand: 'MSI', model: 'MPG Z790 Carbon', price: 449, wattage: 25, specs: { socket: 'LGA1700', chipset: 'Z790', ramType: 'DDR5', maxRam: 192, formFactor: 'ATX', maxTdp: 260 }, imageUrl: null },
  { name: 'Gigabyte Z790 Aorus Master', category: 'MOTHERBOARD', brand: 'Gigabyte', model: 'Z790 Aorus Master', price: 499, wattage: 25, specs: { socket: 'LGA1700', chipset: 'Z790', ramType: 'DDR5', maxRam: 128, formFactor: 'ATX', maxTdp: 250 }, imageUrl: null },
  { name: 'ASRock Z790 Steel Legend WiFi', category: 'MOTHERBOARD', brand: 'ASRock', model: 'Z790 Steel Legend', price: 279, wattage: 20, specs: { socket: 'LGA1700', chipset: 'Z790', ramType: 'DDR5', maxRam: 128, formFactor: 'ATX', maxTdp: 220 }, imageUrl: null },
  { name: 'MSI MAG Z790 Tomahawk WiFi', category: 'MOTHERBOARD', brand: 'MSI', model: 'MAG Z790 Tomahawk', price: 259, wattage: 20, specs: { socket: 'LGA1700', chipset: 'Z790', ramType: 'DDR5', maxRam: 128, formFactor: 'ATX', maxTdp: 220 }, imageUrl: null },
  { name: 'ASUS TUF Gaming B760-PLUS WiFi', category: 'MOTHERBOARD', brand: 'ASUS', model: 'TUF Gaming B760-PLUS', price: 199, wattage: 20, specs: { socket: 'LGA1700', chipset: 'B760', ramType: 'DDR5', maxRam: 128, formFactor: 'ATX', maxTdp: 200 }, imageUrl: null },
  { name: 'MSI MAG B760 Tomahawk WiFi', category: 'MOTHERBOARD', brand: 'MSI', model: 'MAG B760 Tomahawk', price: 199, wattage: 20, specs: { socket: 'LGA1700', chipset: 'B760', ramType: 'DDR5', maxRam: 128, formFactor: 'ATX', maxTdp: 200 }, imageUrl: null },

  // ─── Motherboards (AM4) ───
  { name: 'ASUS ROG Crosshair VIII Dark Hero', category: 'MOTHERBOARD', brand: 'ASUS', model: 'ROG Crosshair VIII Dark Hero', price: 449, wattage: 25, specs: { socket: 'AM4', chipset: 'X570', ramType: 'DDR4', maxRam: 128, formFactor: 'ATX', maxTdp: 230 }, imageUrl: null },
  { name: 'MSI MAG X570 Tomahawk WiFi', category: 'MOTHERBOARD', brand: 'MSI', model: 'MAG X570 Tomahawk', price: 229, wattage: 20, specs: { socket: 'AM4', chipset: 'X570', ramType: 'DDR4', maxRam: 128, formFactor: 'ATX', maxTdp: 200 }, imageUrl: null },
  { name: 'ASUS TUF Gaming B550-PLUS', category: 'MOTHERBOARD', brand: 'ASUS', model: 'TUF Gaming B550-PLUS', price: 149, wattage: 15, specs: { socket: 'AM4', chipset: 'B550', ramType: 'DDR4', maxRam: 128, formFactor: 'ATX', maxTdp: 180 }, imageUrl: null },

  // ─── RAM ───
  { name: 'Corsair Vengeance 16GB DDR5-5600', category: 'RAM', brand: 'Corsair', model: 'Vengeance DDR5-5600', price: 59, wattage: 2, specs: { type: 'DDR5', capacity: 16, speed: 5600, sticks: 2, height: 33, performanceScore: 60 }, imageUrl: null },
  { name: 'G.Skill Trident Z5 32GB DDR5-6000', category: 'RAM', brand: 'G.Skill', model: 'Trident Z5 DDR5-6000', price: 109, wattage: 3, specs: { type: 'DDR5', capacity: 32, speed: 6000, sticks: 2, height: 42, performanceScore: 88 }, imageUrl: null },
  { name: 'Corsair Dominator Titanium 32GB DDR5-6000', category: 'RAM', brand: 'Corsair', model: 'Dominator Titanium 32GB', price: 189, wattage: 3, specs: { type: 'DDR5', capacity: 32, speed: 6000, sticks: 2, height: 44, performanceScore: 85 }, imageUrl: null },
  { name: 'Corsair Dominator Titanium 64GB DDR5-6000', category: 'RAM', brand: 'Corsair', model: 'Dominator Titanium 64GB', price: 259, wattage: 5, specs: { type: 'DDR5', capacity: 64, speed: 6000, sticks: 2, height: 44, performanceScore: 90 }, imageUrl: null },
  { name: 'G.Skill Trident Z5 Neo 32GB DDR5-6000', category: 'RAM', brand: 'G.Skill', model: 'Trident Z5 Neo DDR5-6000', price: 99, wattage: 3, specs: { type: 'DDR5', capacity: 32, speed: 6000, sticks: 2, height: 42, performanceScore: 85 }, imageUrl: null },
  { name: 'G.Skill Trident Z5 RGB 64GB DDR5-6400', category: 'RAM', brand: 'G.Skill', model: 'Trident Z5 RGB DDR5-6400', price: 219, wattage: 5, specs: { type: 'DDR5', capacity: 64, speed: 6400, sticks: 2, height: 43, performanceScore: 91 }, imageUrl: null },
  { name: 'Corsair Vengeance 32GB DDR5-5600', category: 'RAM', brand: 'Corsair', model: 'Vengeance DDR5-5600', price: 89, wattage: 3, specs: { type: 'DDR5', capacity: 32, speed: 5600, sticks: 2, height: 35, performanceScore: 78 }, imageUrl: null },
  { name: 'TeamGroup T-Create 32GB DDR5-6000', category: 'RAM', brand: 'TeamGroup', model: 'T-Create DDR5-6000', price: 89, wattage: 3, specs: { type: 'DDR5', capacity: 32, speed: 6000, sticks: 2, height: 33, performanceScore: 82 }, imageUrl: null },
  { name: 'Corsair Vengeance LPX 32GB DDR4-3600', category: 'RAM', brand: 'Corsair', model: 'Vengeance LPX DDR4-3600', price: 69, wattage: 3, specs: { type: 'DDR4', capacity: 32, speed: 3600, sticks: 2, height: 31, performanceScore: 72 }, imageUrl: null },
  { name: 'G.Skill Trident Z Neo 32GB DDR4-3600', category: 'RAM', brand: 'G.Skill', model: 'Trident Z Neo DDR4-3600', price: 79, wattage: 3, specs: { type: 'DDR4', capacity: 32, speed: 3600, sticks: 2, height: 44, performanceScore: 75 }, imageUrl: null },

  // ─── Storage ───
  { name: 'Samsung 990 Pro 1TB NVMe', category: 'STORAGE', brand: 'Samsung', model: '990 Pro 1TB', price: 109, wattage: 6, specs: { type: 'NVMe', capacity: 1000, readSpeed: 7450, writeSpeed: 6900, interface: 'PCIe 4.0', formFactor: 'M.2', performanceScore: 95 }, imageUrl: null },
  { name: 'Samsung 990 Pro 2TB NVMe', category: 'STORAGE', brand: 'Samsung', model: '990 Pro 2TB', price: 189, wattage: 6, specs: { type: 'NVMe', capacity: 2000, readSpeed: 7450, writeSpeed: 6900, interface: 'PCIe 4.0', formFactor: 'M.2', performanceScore: 97 }, imageUrl: null },
  { name: 'Samsung 990 Pro 4TB NVMe', category: 'STORAGE', brand: 'Samsung', model: '990 Pro 4TB', price: 329, wattage: 6, specs: { type: 'NVMe', capacity: 4096, readSpeed: 7450, writeSpeed: 6900, interface: 'PCIe 4.0', formFactor: 'M.2', performanceScore: 98 }, imageUrl: null },
  { name: 'WD Black SN850X 1TB NVMe', category: 'STORAGE', brand: 'Western Digital', model: 'SN850X 1TB', price: 99, wattage: 6, specs: { type: 'NVMe', capacity: 1000, readSpeed: 7300, writeSpeed: 6300, interface: 'PCIe 4.0', formFactor: 'M.2', performanceScore: 92 }, imageUrl: null },
  { name: 'WD Black SN850X 2TB NVMe', category: 'STORAGE', brand: 'Western Digital', model: 'SN850X 2TB', price: 159, wattage: 6, specs: { type: 'NVMe', capacity: 2000, readSpeed: 7300, writeSpeed: 6600, interface: 'PCIe 4.0', formFactor: 'M.2', performanceScore: 94 }, imageUrl: null },
  { name: 'Crucial T500 1TB NVMe', category: 'STORAGE', brand: 'Crucial', model: 'T500 1TB', price: 89, wattage: 5, specs: { type: 'NVMe', capacity: 1000, readSpeed: 7300, writeSpeed: 6800, interface: 'PCIe 4.0', formFactor: 'M.2', performanceScore: 90 }, imageUrl: null },
  { name: 'Crucial T500 2TB NVMe', category: 'STORAGE', brand: 'Crucial', model: 'T500 2TB', price: 149, wattage: 5, specs: { type: 'NVMe', capacity: 2000, readSpeed: 7300, writeSpeed: 6800, interface: 'PCIe 4.0', formFactor: 'M.2', performanceScore: 92 }, imageUrl: null },
  { name: 'Crucial T700 2TB NVMe', category: 'STORAGE', brand: 'Crucial', model: 'T700 2TB', price: 259, wattage: 9, specs: { type: 'NVMe', capacity: 2000, readSpeed: 12400, writeSpeed: 11800, interface: 'PCIe 5.0', formFactor: 'M.2', performanceScore: 99 }, imageUrl: null },
  { name: 'Seagate FireCuda 530 1TB NVMe', category: 'STORAGE', brand: 'Seagate', model: 'FireCuda 530 1TB', price: 99, wattage: 5, specs: { type: 'NVMe', capacity: 1000, readSpeed: 7300, writeSpeed: 6000, interface: 'PCIe 4.0', formFactor: 'M.2', performanceScore: 88 }, imageUrl: null },
  { name: 'SK Hynix Platinum P41 2TB NVMe', category: 'STORAGE', brand: 'SK Hynix', model: 'Platinum P41 2TB', price: 169, wattage: 6, specs: { type: 'NVMe', capacity: 2000, readSpeed: 7000, writeSpeed: 6500, interface: 'PCIe 4.0', formFactor: 'M.2', performanceScore: 93 }, imageUrl: null },

  // ─── PSUs ───
  { name: 'Corsair RM750e 750W 80+ Gold', category: 'PSU', brand: 'Corsair', model: 'RM750e', price: 89, wattage: 0, specs: { wattage: 750, rating: '80+ Gold', modular: true, formFactor: 'ATX', performanceScore: 82 }, imageUrl: null },
  { name: 'Corsair RM850e 850W 80+ Gold', category: 'PSU', brand: 'Corsair', model: 'RM850e', price: 109, wattage: 0, specs: { wattage: 850, rating: '80+ Gold', modular: true, formFactor: 'ATX', performanceScore: 85 }, imageUrl: null },
  { name: 'Corsair RM1000x 1000W 80+ Gold', category: 'PSU', brand: 'Corsair', model: 'RM1000x', price: 169, wattage: 0, specs: { wattage: 1000, rating: '80+ Gold', modular: true, formFactor: 'ATX', performanceScore: 90 }, imageUrl: null },
  { name: 'Corsair HX1000i 1000W 80+ Platinum', category: 'PSU', brand: 'Corsair', model: 'HX1000i', price: 249, wattage: 0, specs: { wattage: 1000, rating: '80+ Platinum', modular: true, formFactor: 'ATX', performanceScore: 93 }, imageUrl: null },
  { name: 'Corsair HX1200i 1200W 80+ Platinum', category: 'PSU', brand: 'Corsair', model: 'HX1200i', price: 299, wattage: 0, specs: { wattage: 1200, rating: '80+ Platinum', modular: true, formFactor: 'ATX', performanceScore: 95 }, imageUrl: null },
  { name: 'SeaSonic Focus GX-750 750W 80+ Gold', category: 'PSU', brand: 'SeaSonic', model: 'Focus GX-750', price: 99, wattage: 0, specs: { wattage: 750, rating: '80+ Gold', modular: true, formFactor: 'ATX', performanceScore: 80 }, imageUrl: null },
  { name: 'SeaSonic Vertex GX-1000 1000W 80+ Gold', category: 'PSU', brand: 'SeaSonic', model: 'Vertex GX-1000', price: 219, wattage: 0, specs: { wattage: 1000, rating: '80+ Gold', modular: true, formFactor: 'ATX', performanceScore: 92 }, imageUrl: null },
  { name: 'EVGA SuperNOVA 850 G7 850W 80+ Gold', category: 'PSU', brand: 'EVGA', model: 'SuperNOVA 850 G7', price: 149, wattage: 0, specs: { wattage: 850, rating: '80+ Gold', modular: true, formFactor: 'ATX', performanceScore: 86 }, imageUrl: null },
  { name: 'be quiet! Dark Power 13 1000W 80+ Titanium', category: 'PSU', brand: 'be quiet!', model: 'Dark Power 13', price: 269, wattage: 0, specs: { wattage: 1000, rating: '80+ Titanium', modular: true, formFactor: 'ATX', performanceScore: 94 }, imageUrl: null },
  { name: 'be quiet! Straight Power 11 750W 80+ Gold', category: 'PSU', brand: 'be quiet!', model: 'Straight Power 11', price: 129, wattage: 0, specs: { wattage: 750, rating: '80+ Gold', modular: true, formFactor: 'ATX', performanceScore: 84 }, imageUrl: null },

  // ─── Cases ───
  { name: 'Fractal Design North Charcoal', category: 'CASE', brand: 'Fractal Design', model: 'North', price: 139, wattage: 0, specs: { formFactor: 'ATX', maxGpuLength: 355, maxPsuLength: 248, maxCoolerHeight: 170, hasGlass: false, performanceScore: 90 }, imageUrl: null },
  { name: 'Fractal Design Meshify 2', category: 'CASE', brand: 'Fractal Design', model: 'Meshify 2', price: 149, wattage: 0, specs: { formFactor: 'ATX', maxGpuLength: 440, maxPsuLength: 290, maxCoolerHeight: 185, hasGlass: true, performanceScore: 88 }, imageUrl: null },
  { name: 'NZXT H5 Flow', category: 'CASE', brand: 'NZXT', model: 'H5 Flow', price: 94, wattage: 0, specs: { formFactor: 'ATX', maxGpuLength: 365, maxPsuLength: 250, maxCoolerHeight: 165, hasGlass: true, performanceScore: 78 }, imageUrl: null },
  { name: 'NZXT H6 Flow', category: 'CASE', brand: 'NZXT', model: 'H6 Flow', price: 109, wattage: 0, specs: { formFactor: 'ATX', maxGpuLength: 365, maxPsuLength: 250, maxCoolerHeight: 170, hasGlass: true, performanceScore: 80 }, imageUrl: null },
  { name: 'NZXT H7 Flow', category: 'CASE', brand: 'NZXT', model: 'H7 Flow', price: 129, wattage: 0, specs: { formFactor: 'ATX', maxGpuLength: 400, maxPsuLength: 240, maxCoolerHeight: 185, hasGlass: true, performanceScore: 82 }, imageUrl: null },
  { name: 'Lian Li O11 Dynamic EVO', category: 'CASE', brand: 'Lian Li', model: 'O11 Dynamic EVO', price: 169, wattage: 0, specs: { formFactor: 'ATX', maxGpuLength: 420, maxPsuLength: 260, maxCoolerHeight: 155, hasGlass: true, performanceScore: 88 }, imageUrl: null },
  { name: 'Lian Li O11 Vision', category: 'CASE', brand: 'Lian Li', model: 'O11 Vision', price: 179, wattage: 0, specs: { formFactor: 'ATX', maxGpuLength: 435, maxPsuLength: 250, maxCoolerHeight: 165, hasGlass: true, performanceScore: 86 }, imageUrl: null },
  { name: 'Corsair 4000D Airflow', category: 'CASE', brand: 'Corsair', model: '4000D Airflow', price: 89, wattage: 0, specs: { formFactor: 'ATX', maxGpuLength: 360, maxPsuLength: 220, maxCoolerHeight: 170, hasGlass: true, performanceScore: 80 }, imageUrl: null },
  { name: 'Corsair 5000D Airflow', category: 'CASE', brand: 'Corsair', model: '5000D Airflow', price: 139, wattage: 0, specs: { formFactor: 'ATX', maxGpuLength: 420, maxPsuLength: 250, maxCoolerHeight: 170, hasGlass: true, performanceScore: 84 }, imageUrl: null },
  { name: 'Corsair 7000D Airflow', category: 'CASE', brand: 'Corsair', model: '7000D Airflow', price: 189, wattage: 0, specs: { formFactor: 'E-ATX', maxGpuLength: 460, maxPsuLength: 300, maxCoolerHeight: 180, hasGlass: true, performanceScore: 90 }, imageUrl: null },
  { name: 'Corsair 2500X', category: 'CASE', brand: 'Corsair', model: '2500X', price: 109, wattage: 0, specs: { formFactor: 'mATX', maxGpuLength: 365, maxPsuLength: 220, maxCoolerHeight: 165, hasGlass: true, performanceScore: 75 }, imageUrl: null },
  { name: 'Fractal Design Terra', category: 'CASE', brand: 'Fractal Design', model: 'Terra', price: 179, wattage: 0, specs: { formFactor: 'ITX', maxGpuLength: 322, maxPsuLength: 250, maxCoolerHeight: 77, hasGlass: false, performanceScore: 82 }, imageUrl: null },

  // ─── Cooling ───
  { name: 'NZXT Kraken Elite 240 RGB', category: 'COOLING', brand: 'NZXT', model: 'Kraken Elite 240', price: 229, wattage: 10, specs: { type: 'AIO', size: '240mm', fanCount: 2, rgb: true, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA115X'], performanceScore: 85 }, imageUrl: null },
  { name: 'NZXT Kraken Elite 360 RGB', category: 'COOLING', brand: 'NZXT', model: 'Kraken Elite 360', price: 279, wattage: 12, specs: { type: 'AIO', size: '360mm', fanCount: 3, rgb: true, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA115X'], performanceScore: 92 }, imageUrl: null },
  { name: 'NZXT Kraken X73 360mm', category: 'COOLING', brand: 'NZXT', model: 'Kraken X73', price: 249, wattage: 10, specs: { type: 'AIO', size: '360mm', fanCount: 3, rgb: false, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA115X'], performanceScore: 90 }, imageUrl: null },
  { name: 'Corsair iCUE H150i Elite Capellix 360mm', category: 'COOLING', brand: 'Corsair', model: 'H150i Elite Capellix', price: 219, wattage: 10, specs: { type: 'AIO', size: '360mm', fanCount: 3, rgb: true, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA115X'], performanceScore: 90 }, imageUrl: null },
  { name: 'Corsair iCUE H100i Elite Capellix 240mm', category: 'COOLING', brand: 'Corsair', model: 'H100i Elite Capellix', price: 169, wattage: 8, specs: { type: 'AIO', size: '240mm', fanCount: 2, rgb: true, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA115X'], performanceScore: 82 }, imageUrl: null },
  { name: 'Corsair iCUE H150i Elite LCD 360mm', category: 'COOLING', brand: 'Corsair', model: 'H150i Elite LCD', price: 259, wattage: 12, specs: { type: 'AIO', size: '360mm', fanCount: 3, rgb: true, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA115X'], performanceScore: 91 }, imageUrl: null },
  { name: 'ARCTIC Liquid Freezer III 360', category: 'COOLING', brand: 'ARCTIC', model: 'Liquid Freezer III 360', price: 119, wattage: 10, specs: { type: 'AIO', size: '360mm', fanCount: 3, rgb: false, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA1851', 'LGA115X'], performanceScore: 88 }, imageUrl: null },
  { name: 'ARCTIC Liquid Freezer III 280', category: 'COOLING', brand: 'ARCTIC', model: 'Liquid Freezer III 280', price: 109, wattage: 8, specs: { type: 'AIO', size: '280mm', fanCount: 2, rgb: false, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA1851', 'LGA115X'], performanceScore: 84 }, imageUrl: null },
  { name: 'DeepCool LT720 360mm', category: 'COOLING', brand: 'DeepCool', model: 'LT720', price: 139, wattage: 10, specs: { type: 'AIO', size: '360mm', fanCount: 3, rgb: true, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA115X'], performanceScore: 86 }, imageUrl: null },
  { name: 'Noctua NH-D15 Chromax', category: 'COOLING', brand: 'Noctua', model: 'NH-D15', price: 119, wattage: 2, specs: { type: 'Air', size: 'Dual Tower', fanCount: 2, rgb: false, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA1851', 'LGA115X'], performanceScore: 88, height: 165 }, imageUrl: null },
  { name: 'Noctua NH-U12S Redux', category: 'COOLING', brand: 'Noctua', model: 'NH-U12S Redux', price: 54, wattage: 1, specs: { type: 'Air', size: 'Single Tower', fanCount: 1, rgb: false, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA115X'], performanceScore: 72, height: 158 }, imageUrl: null },
  { name: 'be quiet! Dark Rock Pro 5', category: 'COOLING', brand: 'be quiet!', model: 'Dark Rock Pro 5', price: 99, wattage: 2, specs: { type: 'Air', size: 'Dual Tower', fanCount: 2, rgb: false, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA115X'], performanceScore: 85, height: 168 }, imageUrl: null },
  { name: 'Thermalright Peerless Assassin 120 SE', category: 'COOLING', brand: 'Thermalright', model: 'Peerless Assassin 120 SE', price: 36, wattage: 2, specs: { type: 'Air', size: 'Dual Tower', fanCount: 2, rgb: false, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA115X'], performanceScore: 80, height: 155 }, imageUrl: null },
  { name: 'Cooler Master Hyper 212 Halo', category: 'COOLING', brand: 'Cooler Master', model: 'Hyper 212 Halo', price: 49, wattage: 1, specs: { type: 'Air', size: 'Single Tower', fanCount: 1, rgb: true, socket: ['AM5', 'AM4', 'LGA1700', 'LGA1200', 'LGA115X'], performanceScore: 65, height: 153 }, imageUrl: null },

  // ─── OS ───
  { name: 'Windows 11 Home', category: 'OS', brand: 'Microsoft', model: 'Windows 11 Home', price: 139, wattage: 0, specs: { type: 'OS', version: '11', edition: 'Home', performanceScore: 70 }, imageUrl: null },
  { name: 'Windows 11 Pro', category: 'OS', brand: 'Microsoft', model: 'Windows 11 Pro', price: 199, wattage: 0, specs: { type: 'OS', version: '11', edition: 'Pro', performanceScore: 75 }, imageUrl: null },

  // ─── Peripherals ───
  { name: 'Logitech G Pro X Superlight 2', category: 'PERIPHERAL', brand: 'Logitech', model: 'G Pro X Superlight 2', price: 159, wattage: 1, specs: { type: 'Mouse', connection: 'Wireless', dpi: 32000, performanceScore: 95 }, imageUrl: null },
  { name: 'Logitech G502 X Plus', category: 'PERIPHERAL', brand: 'Logitech', model: 'G502 X Plus', price: 149, wattage: 1, specs: { type: 'Mouse', connection: 'Wireless', dpi: 25600, performanceScore: 90 }, imageUrl: null },
  { name: 'Razer DeathAdder V3 Pro', category: 'PERIPHERAL', brand: 'Razer', model: 'DeathAdder V3 Pro', price: 149, wattage: 1, specs: { type: 'Mouse', connection: 'Wireless', dpi: 30000, performanceScore: 92 }, imageUrl: null },
  { name: 'Wooting 60HE+', category: 'PERIPHERAL', brand: 'Wooting', model: '60HE+', price: 219, wattage: 2, specs: { type: 'Keyboard', connection: 'USB-C', layout: '60%', performanceScore: 95 }, imageUrl: null },
  { name: 'Razer Huntsman V3 Pro TKL', category: 'PERIPHERAL', brand: 'Razer', model: 'Huntsman V3 Pro TKL', price: 199, wattage: 2, specs: { type: 'Keyboard', connection: 'USB-C', layout: 'TKL', performanceScore: 88 }, imageUrl: null },
  { name: 'Keychron Q1 Max', category: 'PERIPHERAL', brand: 'Keychron', model: 'Q1 Max', price: 219, wattage: 2, specs: { type: 'Keyboard', connection: 'Wireless', layout: '75%', performanceScore: 90 }, imageUrl: null },
  { name: 'SteelSeries Arc Nova Pro Wireless', category: 'PERIPHERAL', brand: 'SteelSeries', model: 'Arc Nova Pro', price: 349, wattage: 2, specs: { type: 'Headset', connection: 'Wireless', frequency: '20-40000Hz', performanceScore: 92 }, imageUrl: null },
  { name: 'Sony WH-1000XM5', category: 'PERIPHERAL', brand: 'Sony', model: 'WH-1000XM5', price: 399, wattage: 1, specs: { type: 'Headset', connection: 'Wireless', noiseCanceling: true, performanceScore: 90 }, imageUrl: null },
]

const badges = [
  { name: 'FIRST_BUILD', description: 'Created your first PC build', icon: 'Cpu', rarity: 'COMMON', condition: { buildsCreated: 1 } },
  { name: 'BUILDER_5', description: 'Created 5 PC builds', icon: 'Layers', rarity: 'UNCOMMON', condition: { buildsCreated: 5 } },
  { name: 'BUILDER_10', description: 'Created 10 PC builds', icon: 'Award', rarity: 'RARE', condition: { buildsCreated: 10 } },
  { name: 'HIGH_END', description: 'Built a PC worth over $3000', icon: 'Crown', rarity: 'RARE', condition: { priceThreshold: 3000 } },
  { name: 'ULTIMATE_RIG', description: 'Built a PC worth over $5000', icon: 'Trophy', rarity: 'EPIC', condition: { priceThreshold: 5000 } },
  { name: 'PERFORMANCE_TUNER', description: 'Achieved over 150 FPS at 1080p', icon: 'Zap', rarity: 'UNCOMMON', condition: { fpsThreshold: 150 } },
  { name: 'FPS_CHASER', description: 'Achieved over 200 FPS at 1080p', icon: 'Flame', rarity: 'RARE', condition: { fpsThreshold: 200 } },
  { name: 'ELITE_OVERCLOCKER', description: 'Achieved over 250 FPS at 1080p', icon: 'Star', rarity: 'LEGENDARY', condition: { fpsThreshold: 250 } },
  { name: 'COMPATIBILITY_EXPERT', description: 'Created a build with zero compatibility issues', icon: 'CheckCircle', rarity: 'UNCOMMON', condition: { perfectBuild: true } },
  { name: 'TEAM_AMD', description: 'Created a build with AMD CPU and AMD GPU', icon: 'CircleDot', rarity: 'RARE', condition: { cpuBrand: 'AMD', gpuBrand: 'AMD' } },
  { name: 'TEAM_INTEL_NVIDIA', description: 'Created a build with Intel CPU and NVIDIA GPU', icon: 'Shield', rarity: 'RARE', condition: { cpuBrand: 'Intel', gpuBrand: 'NVIDIA' } },
  { name: 'STORAGE_GIANT', description: 'Configured over 4TB total storage', icon: 'Disc', rarity: 'UNCOMMON', condition: { storageThreshold: 4000 } },
  { name: 'COLLECTOR', description: 'Saved 5 builds from other users', icon: 'Bookmark', rarity: 'EPIC', condition: { savesCount: 5 } },
  { name: 'BUDGET_BUILDER', description: 'Built a complete PC under $1000', icon: 'DollarSign', rarity: 'UNCOMMON', condition: { budgetBuild: true } },
  { name: 'RGB_FANATIC', description: 'Included RGB in 3+ component categories', icon: 'Palette', rarity: 'RARE', condition: { rgbCategories: 3 } },
]

async function main() {
  console.log('Seeding Forge PC database...\n')

  await prisma.component.deleteMany({})
  await prisma.badge.deleteMany({})

  for (const component of components) {
    const data = {
      ...component,
      specs: JSON.stringify(component.specs),
      id: `${component.brand}-${component.model}`.replace(/[^a-zA-Z0-9_-]/g, '_'),
      inStock: true,
    }
    await prisma.component.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    })
    console.log(`  ${component.name}`)
  }
  console.log(`\n  ${components.length} components seeded`)

  for (const badge of badges) {
    const data = {
      ...badge,
      condition: JSON.stringify(badge.condition),
    }
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: data,
      create: data,
    })
    console.log(`  Badge: ${badge.name}`)
  }
  console.log(`\n  ${badges.length} badges seeded`)

  console.log('\nSeeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
