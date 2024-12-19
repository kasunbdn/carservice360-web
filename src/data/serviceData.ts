export const jobTypes = [
  { value: "maintenance", label: "Maintenance" },
  { value: "repair", label: "Repair" },
  { value: "custom", label: "Custom Work" },
];

export const branches = [
  { value: "main", label: "Anuradhapura" },
  { value: "first", label: "Colombo" },
  { value: "second", label: "Medawachchiya" },
];

export const serviceAdvisers = [
  { value: "miko", label: "Yae Miko", specialization: "General Service" },
  {
    value: "reiden",
    label: "Raiden Shogun",
    specialization: "Engine Specialist",
  },
  {
    value: "arlecchino",
    label: "Arlecchino",
    specialization: "Electrical Systems",
  },
];

export const predefinedServices = [
  { name: "Oil Change", price: 49.99, category: "maintenance" },
  { name: "Brake Service", price: 199.99, category: "repair" },
  { name: "Tire Rotation", price: 29.99, category: "maintenance" },
  { name: "Engine Diagnostics", price: 89.99, category: "diagnostics" },
  { name: "Air Filter Replacement", price: 39.99, category: "maintenance" },
  { name: "Wheel Alignment", price: 79.99, category: "maintenance" },
  { name: "Battery Replacement", price: 159.99, category: "repair" },
  { name: "AC Service", price: 129.99, category: "maintenance" },
  { name: "Transmission Fluid Change", price: 149.99, category: "maintenance" },
  { name: "Spark Plugs Replacement", price: 89.99, category: "repair" },
];
