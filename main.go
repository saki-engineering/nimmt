package main

import (
	"io/ioutil"
	"os"

	"github.com/leaanthony/mewn"
	"github.com/wailsapp/wails"
)

func OCR(data string) []int {
	createScreenShotPNG(data)

	createCardList(screenshotFilename)

	// Nはカードの枚数
	cardFilesInHand, _ := ioutil.ReadDir(cardInHandDir)
	N := len(cardFilesInHand)
	cardNumberList := make([]int, N)

	// ここから文字認識
	for i, cardfile := range cardFilesInHand {
		cardInHandFilename := cardInHandDir + "/" + cardfile.Name()
		cardInHandImage, _ := createImage(cardInHandFilename)
		cardInHandDest := getGrayScale(&cardInHandImage)

		cardNumberList[i] = getFileNumber(kNN(cardInHandDest))

		// 使ったresultファイルは削除
		os.Remove(cardInHandFilename)
	}

	os.Remove(screenshotFilename)

	return cardNumberList
}

func main() {

	js := mewn.String("./frontend/build/static/js/main.js")
	css := mewn.String("./frontend/build/static/css/main.css")

	app := wails.CreateApp(&wails.AppConfig{
		Width:     1400,
		Height:    768,
		Title:     "nimmt",
		JS:        js,
		CSS:       css,
		Resizable: true,
		Colour:    "#131313",
	})

	app.Bind(OCR)
	app.Run()
}
