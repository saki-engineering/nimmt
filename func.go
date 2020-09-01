package main

import (
	"encoding/base64"
	"os"
	"strings"
)

func createScreenShotPNG(data *[]interface{}) {
	receivedData := ""
	for _, d := range *data {
		if dd, ok := d.(string); ok {
			receivedData += string(dd)
		}
	}
	receivedDataArray := strings.Split(receivedData, ",")

	decoded, _ := base64.StdEncoding.DecodeString(receivedDataArray[1])
	file, _ := os.Create("screenshot.png")
	defer file.Close()

	file.Write(decoded)
}
