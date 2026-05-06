#ifndef SENSORS_H
#define SENSORS_H

#include <Arduino.h>
#include <vector>

#define RFM95_CS  11
#define RFM95_RST 22
#define RFM95_INT 25

#define BATTERY_V_PIN 1

#define BATT_V_MAX 6.0
#define BATT_V_MIN 4.0
#define RESISTOR_1 100000.0
#define RESISTOR_2 10000.0
#define RESISTOR_RATIO RESISTOR_2 / (RESISTOR_1 + RESISTOR_2)
#define ADC_BATT_MARK  int(((BATT_V_MAX * RESISTOR_RATIO) / 3.3) * 4095)
#define ADC_BATT_BASE  int(((BATT_V_MIN * RESISTOR_RATIO) / 3.3) * 4095)

#define SENSOR_Trigger_1 0
#define SENSOR_RAW_PIN_1 2
#define SENSOR_Trigger_2 12
#define SENSOR_RAW_PIN_2 3

#define R_DEVIDER 10000.0

#define NEO_PIXEL 8

const uint8_t SENSOR_TRIGGER_PINS[2] = { SENSOR_Trigger_1, SENSOR_Trigger_2 };
const uint8_t SENSOR_RAW_PINS[2] = { SENSOR_RAW_PIN_1, SENSOR_RAW_PIN_2 };

void pinInit() {
  pinMode(BATTERY_V_PIN, INPUT);
  pinMode(SENSOR_Trigger_1, OUTPUT);
  pinMode(SENSOR_RAW_PIN_1, INPUT);
  pinMode(SENSOR_Trigger_2, OUTPUT);
  pinMode(SENSOR_RAW_PIN_2, INPUT);
  pinMode(NEO_PIXEL, OUTPUT);
}

float RS_calculate(int RAW_Val) {
  float voltage = ((RAW_Val * 1.0) / 4095.0) * 3.3;
  float Resistance = R_DEVIDER * ((3.3 / voltage) - 1);

  return isinf(Resistance) ? -1 : Resistance;
}

float getBattery(bool convert_flag = false) {
  int Batt_ADC = analogRead(BATTERY_V_PIN);

  if (convert_flag) {
    return Batt_ADC;
  } else {
    return constrain((map(Batt_ADC, ADC_BATT_BASE, ADC_BATT_MARK, 0, 10000) / 100), 0, 100);
  }
}

float getSensor(uint8_t sensor = 1, bool convert_flag = false) {
  if (sensor < 1 || sensor > 2) return -1;
  uint8_t idx = sensor - 1;
  int val_raw = 0;

  for (int count = 0; count < 5; count++) {
    digitalWrite(SENSOR_TRIGGER_PINS[idx], HIGH);
    delayMicroseconds(100);
    val_raw += analogRead(SENSOR_RAW_PINS[idx]);
    digitalWrite(SENSOR_TRIGGER_PINS[idx], LOW);
    delayMicroseconds(200);
  }

  val_raw /= 5;
  return convert_flag ? (float)val_raw : RS_calculate(val_raw);
}

String HexToStr(uint8_t* data, size_t len) {
  String result = "";
  for (size_t i = 0; i < len; i++) {
    result += (char)data[i];
  }
  return result;
}

byte hexCharToValue(char c) {
  if (c >= '0' && c <= '9') return c - '0';
  if (c >= 'A' && c <= 'F') return c - 'A' + 10;
  if (c >= 'a' && c <= 'f') return c - 'a' + 10;
  return 0;
}

std::vector<uint8_t> hexStringToBytes(const String& hexStr) {
  size_t len = hexStr.length();
  // Ensure we have an even number of characters
  size_t outSize = len / 2;
  std::vector<uint8_t> out;
  out.reserve(outSize);

  for (size_t i = 0; i < len; i += 2) {
    uint8_t byte = (hexCharToValue(hexStr[i]) << 4) | hexCharToValue(hexStr[i + 1]);
    out.push_back(byte);
  }
  return out;
}

#endif