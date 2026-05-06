#include <RadioLib.h>
#include <SIMPBoardConfig.h>
#include <EEPROM.h>

const LoRaWANBand_t Region = AS923;
String strDevAddr = "0F6ED335";
String strNwkSKey = "317B03EFB2C2D69481F93728A9409D86";
String strAppSKey = "005C6E3F14579B23CD2D7B19312FC76D";

uint32_t DevAddr = strtoul(strDevAddr.c_str(), NULL, 16);
std::vector<uint8_t> nwkBytes = hexStringToBytes(strNwkSKey);
std::vector<uint8_t> appBytes = hexStringToBytes(strAppSKey);

SX1276 radio = new Module(RFM95_CS, RFM95_INT, RFM95_RST);
LoRaWANNode node(&radio, &Region);

char messageBuffer[64];
int LORA_SEND_TIME = 15;

void setup() {
  Serial.begin(115200);
  SPI.begin(10, 4, 5);
  pinInit();

  while (radio.begin())
    ;
  radio.setSpreadingFactor(10);
  radio.setBandwidth(125.0);

  node.beginABP(DevAddr, NULL, NULL, nwkBytes.data(), appBytes.data());
  node.activateABP();
  node.setDeviceStatus(map(getBattery(), 0, 100, 1, 254));

  snprintf(messageBuffer, sizeof(messageBuffer), "message from Node : %s", strDevAddr);
  const char* message = messageBuffer;
  uint8_t downlinkBuffer[64];
  size_t downlinkLength = 0;

  int16_t response = node.sendReceive(message, 1, downlinkBuffer, &downlinkLength, false, NULL, NULL);

  Serial.print("response : ");
  Serial.println(response);
  Serial.print("downlinkLength : ");
  Serial.println(downlinkLength);
  Serial.print("payload : ");
  Serial.println(HexToStr(downlinkBuffer, downlinkLength));
}

void loop() {}
