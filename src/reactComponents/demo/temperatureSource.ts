type TemperatureSource = {
  value: number;
  name: string;
};

function createTempSourceRandom(
  name: string,
  min: number,
  max: number
): TemperatureSource {
  return {
    name: name,
    value: Math.round(Math.random() * (max - min) + min)
  };
}

function createTempSource(name: string, value: number): TemperatureSource {
  return {
    name: name,
    value: value
  };
}

export type { TemperatureSource };

export { createTempSourceRandom, createTempSource };
