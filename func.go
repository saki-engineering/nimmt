package main

import (
	"encoding/base64"
	"image"
	"image/color"
	"image/png"
	"io/ioutil"
	"math"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

var (
	cardBounds         = image.Rect(0, 0, 133, 205)
	cardInHandDir      = "result"
	originalCardDir    = "number"
	screenshotFilename = "screenshot.png"
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
	file, _ := os.Create(screenshotFilename)
	defer file.Close()

	file.Write(decoded)
}

func createImage(fileURL string) (image.Image, error) {
	// 元画像open
	file, err := os.Open(fileURL)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// image pacのImageインターフェース作成
	img, _, err := image.Decode(file)
	if err != nil {
		return nil, err
	}

	return img, nil
}

func getGrayScale(img *image.Image) *image.Gray16 {
	// bounds.Min.X, bounds.Max.Xは0~幅のpic数
	// bounds.Min.Y, bounds.Max.Yは0~高さのpic数
	bounds := (*img).Bounds()
	dest := image.NewGray16(bounds)

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			// img.At(x,y)で、そのピクセルのColor情報が得られる
			c := color.Gray16Model.Convert((*img).At(x, y))
			gray, _ := c.(color.Gray16)
			dest.Set(x, y, gray)
		}
	}

	return dest
}

func createPNG(filename string, dest *image.Gray16) error {
	dstfile, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer dstfile.Close()

	png.Encode(dstfile, dest)
	return nil
}

func AbsGray16(A, B color.Gray16) int {
	aY, bY := int(A.Y), int(B.Y)
	diff := aY - bY
	if diff < 0 {
		return -diff
	}
	return diff
}

func kNN(cardInHandDest *image.Gray16) string {
	ansfile := "0.png"
	ansdist := int(math.Pow10(18))

	originalCardList, _ := ioutil.ReadDir(originalCardDir)

	for _, originalCardFile := range originalCardList {
		originalImage, _ := createImage(originalCardDir + "/" + originalCardFile.Name())
		originalDest := getGrayScale(&originalImage)

		tmpdist := 0
		for cy := cardBounds.Min.Y; cy < cardBounds.Max.Y; cy++ {
			for cx := cardBounds.Min.X; cx < cardBounds.Max.X; cx++ {
				tmpdist += AbsGray16((*cardInHandDest).Gray16At(cx, cy), originalDest.Gray16At(cx, cy))
			}
		}

		if tmpdist <= ansdist {
			ansdist = tmpdist
			ansfile = originalCardFile.Name()
		}
	}
	return ansfile
}

func getFileNumber(filename string) int {
	ext := filepath.Ext(filename)
	numberStr := strings.Replace(filename, ext, "", 1)

	number, _ := strconv.Atoi(numberStr)
	return number
}

func createCardList(filename string) {
	img, _ := createImage(filename)
	dest := getGrayScale(&img)
	bounds := img.Bounds()

	cardDest := image.NewGray16(cardBounds)

	cnt := 1
	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			c := dest.Gray16At(x, y)
			if c.Y < 60000 {
				continue
			}

			for cy := cardBounds.Min.Y; cy < cardBounds.Max.Y; cy++ {
				for cx := cardBounds.Min.X; cx < cardBounds.Max.X; cx++ {
					cardDest.Set(cx, cy, dest.Gray16At(x+cx, y+cy))
					dest.Set(x+cx, y+cy, color.Black)
				}
			}

			filename := cardInHandDir + "/" + strconv.Itoa(cnt) + ".png"
			createPNG(filename, cardDest)
			cnt++
		}
	}
}
