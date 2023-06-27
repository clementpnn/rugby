/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neutral0 : "hsl(var(--neutral0))",
          foreground: "hsl(var(--neutral-foreground))", 
        
        neutral1 : "hsl(var(--neutral1))",
          foreground: "hsl(var(--neutral-foreground))", 

        neutral2 : "hsl(var(--neutral2))",
          foreground: "hsl(var(--neutral-foreground))", 

          neutral3 : "hsl(var(--neutral3))",
          foreground: "hsl(var(--neutral-foreground))", 

        neutral4 : "hsl(var(--neutral4))",
          foreground: "hsl(var(--neutral-foreground))", 

        neutral5 : "hsl(var(--neutral5))",
          foreground: "hsl(var(--neutral-foreground))", 

        neutral6 : "hsl(var(--neutral6))",
          foreground: "hsl(var(--neutral-foreground))", 

        neutral7 : "hsl(var(--neutral7))",
          foreground: "hsl(var(--neutral-foreground))", 

        neutral8 : "hsl(var(--neutral8))",
          foreground: "hsl(var(--neutral-foreground))", 

        neutral9 : "hsl(var(--neutral9))",
          foreground: "hsl(var(--neutral-foreground))", 

        neutral10 : "hsl(var(--neutral10))",
          foreground: "hsl(var(--neutral-foreground))", 
        
        neutral11 : "hsl(var(--neutral11))",
          foreground: "hsl(var(--neutral-foreground))",

        
        red1: "hsl(var(--red1))",
          foreground : "hsl(var(--red-foreground))",

        red2: "hsl(var(--red2))",
          foreground : "hsl(var(--red-foreground))",

        red3: "hsl(var(--red3))",
          foreground : "hsl(var(--red-foreground))",
        
          red4: "hsl(var(--red4))",
          foreground : "hsl(var(--red-foreground))",

        red5: "hsl(var(--red5))",
          foreground : "hsl(var(--red-foreground))",

        red6: "hsl(var(--red6))",
          foreground : "hsl(var(--red-foreground))",

        red7: "hsl(var(--red7))",
          foreground : "hsl(var(--red-foreground))",

        red8: "hsl(var(--red8))",
          foreground : "hsl(var(--red-foreground))",
          
        red9: "hsl(var(--red9))",
          foreground : "hsl(var(--red-foreground))",

        red10: "hsl(var(--red10))",
          foreground : "hsl(var(--red-foreground))",


        blue1: "hsl(var(--blue1))",
          foreground : "hsl(var(--blue-foreground))",

        blue2: "hsl(var(--blue2))",
          foreground : "hsl(var(--blue-foreground))",

        blue3: "hsl(var(--blue3))",
          foreground : "hsl(var(--blue-foreground))",
        
        blue4: "hsl(var(--blue4))",
          foreground : "hsl(var(--blue-foreground))",

        blue5: "hsl(var(--blue5))",
          foreground : "hsl(var(--blue-foreground))",

        blue6: "hsl(var(--blue6))",
          foreground : "hsl(var(--blue-foreground))",

        blue7: "hsl(var(--blue7))",
          foreground : "hsl(var(--blue-foreground))",

        blue8: "hsl(var(--blue8))",
          foreground : "hsl(var(--blue-foreground))",
          
        blue9: "hsl(var(--blue9))",
          foreground : "hsl(var(--blue-foreground))",

        blue10: "hsl(var(--blue10))",
          foreground : "hsl(var(--blue-foreground))",


        warning1: "hsl(var(--warning1))",
          foreground : "hsl(var(--warning-foreground))",

        warning2: "hsl(var(--warning2))",
          foreground : "hsl(var(--warning-foreground))",

        warning3: "hsl(var(--warning3))",
          foreground : "hsl(var(--warning-foreground))",
        
          warning4: "hsl(var(--warning4))",
          foreground : "hsl(var(--warning-foreground))",

        warning5: "hsl(var(--warning5))",
          foreground : "hsl(var(--warning-foreground))",

        warning6: "hsl(var(--warning6))",
          foreground : "hsl(var(--warning-foreground))",

        warning7: "hsl(var(--warning7))",
          foreground : "hsl(var(--warning-foreground))",

        warning8: "hsl(var(--warning8))",
          foreground : "hsl(var(--warning-foreground))",
          
        warning9: "hsl(var(--warning9))",
          foreground : "hsl(var(--warning-foreground))",

        warning10: "hsl(var(--warning10))",
          foreground : "hsl(var(--warning-foreground))",

      
        error1: "hsl(var(--error1))",
          foreground : "hsl(var(--error-foreground))",

        error2: "hsl(var(--error2))",
          foreground : "hsl(var(--error-foreground))",

        error3: "hsl(var(--error3))",
          foreground : "hsl(var(--error-foreground))",
        
        error4: "hsl(var(--error4))",
          foreground : "hsl(var(--error-foreground))",

        error5: "hsl(var(--error5))",
          foreground : "hsl(var(--error-foreground))",

        error6: "hsl(var(--error6))",
          foreground : "hsl(var(--error-foreground))",

        error7: "hsl(var(--error7))",
          foreground : "hsl(var(--error-foreground))",

        error8: "hsl(var(--error8))",
          foreground : "hsl(var(--error-foreground))",
          
        error9: "hsl(var(--error9))",
          foreground : "hsl(var(--error-foreground))",

        error10: "hsl(var(--error10))",
          foreground : "hsl(var(--error-foreground))",


        info1: "hsl(var(--info1))",
          foreground : "hsl(var(--info-foreground))",

        info2: "hsl(var(--info2))",
          foreground : "hsl(var(--info-foreground))",

        info3: "hsl(var(--info3))",
          foreground : "hsl(var(--info-foreground))",
        
          info4: "hsl(var(--info4))",
          foreground : "hsl(var(--info-foreground))",

        info5: "hsl(var(--info5))",
          foreground : "hsl(var(--info-foreground))",

        info6: "hsl(var(--info6))",
          foreground : "hsl(var(--info-foreground))",

        info7: "hsl(var(--info7))",
          foreground : "hsl(var(--info-foreground))",

        info8: "hsl(var(--info8))",
          foreground : "hsl(var(--info-foreground))",
          
        info9: "hsl(var(--info9))",
          foreground : "hsl(var(--info-foreground))",

        info10: "hsl(var(--info10))",
          foreground : "hsl(var(--info-foreground))",

      
        succes1: "hsl(var(--succes1))",
          foreground : "hsl(var(--success-foreground))",

        success2: "hsl(var(--success2))",
          foreground : "hsl(var(--success-foreground))",

        success3: "hsl(var(--success3))",
          foreground : "hsl(var(--success-foreground))",
        
          success4: "hsl(var(--success4))",
          foreground : "hsl(var(--success-foreground))",

        success5: "hsl(var(--success5))",
          foreground : "hsl(var(--success-foreground))",

        success6: "hsl(var(--success6))",
          foreground : "hsl(var(--success-foreground))",

        success7: "hsl(var(--success7))",
          foreground : "hsl(var(--success-foreground))",

        success8: "hsl(var(--success8))",
          foreground : "hsl(var(--success-foreground))",
          
        success9: "hsl(var(--success9))",
          foreground : "hsl(var(--success-foreground))",

        success10: "hsl(var(--success10))",
          foreground : "hsl(var(--success-foreground))",
        
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // eslint-disable-next-line unicorn/prefer-module
  plugins: [require("tailwindcss-animate")],
}