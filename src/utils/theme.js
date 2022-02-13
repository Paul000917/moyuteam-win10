import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'
let curColor = window.global.themeDefault
export function changeThemeColor (newColor) {
  var options = {
    newColors: [...forElementUI.getElementUISeries(newColor)]
  }
  return client.changer.changeColor(options, Promise)
    .then(() => {
      curColor = newColor
      localStorage.setItem('theme_color', curColor)
    })
}
export function initThemeColor () {
  const savedColor = localStorage.getItem('theme_color')
  if (savedColor) {
    curColor = savedColor
    changeThemeColor(savedColor)
  }else
  {
    changeThemeColor(curColor)
  }
}
