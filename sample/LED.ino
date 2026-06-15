const int ledPin = 13;
bool ledState = false;         // Initial state: OFF
unsigned long sendTimer = 0;
const long sendInterval = 3000; // Report status every 3 seconds

void setup() {
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
  Serial.begin(9600);
}

void loop() {
  // Report current LED status every 3 seconds (Standard JSON format)
  if (millis() - sendTimer >= sendInterval) {
    sendTimer = millis();
    if (ledState) {
      Serial.println("{\"led\":\"on\"}");
    } else {
      Serial.println("{\"led\":\"off\"}");
    }
  }

  // Read serial JSON command, parse and set LED state
  if (Serial.available() > 0) {
    String recvStr = Serial.readStringUntil('\n');
    recvStr.trim();

    // Simple JSON string parsing
    if (recvStr.indexOf("\"led\":\"on\"") != -1) {
      ledState = true;
      digitalWrite(ledPin, HIGH);
    } else if (recvStr.indexOf("\"led\":\"off\"") != -1) {
      ledState = false;
      digitalWrite(ledPin, LOW);
    }
  }
}