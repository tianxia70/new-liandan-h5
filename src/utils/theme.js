import { ref, watchEffect } from 'vue'
import { DEFAULT_THEME } from '@/config/index'

export const theme = ref(localStorage.getItem('theme') || DEFAULT_THEME)
export let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--van-primary-color');
 
export function useTheme() {
  const setTheme = (newTheme = DEFAULT_THEME) => {
    theme.value = newTheme
    // localStorage.setItem('theme', newTheme)
    // document.documentElement.setAttribute('data-theme', newTheme)
  }

  watchEffect(() => {
    console.log(12121212)
    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem('theme', theme.value)

    primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--van-primary-color')
  })

  return { theme, setTheme }
}