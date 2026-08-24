export function FooterScene() {
  return (
    <div
      className="relative h-44 w-full overflow-hidden bg-ink md:h-56"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-full w-full"
      >
        <defs>
          {/* Very fine distant dots */}
          <pattern
            id="dots-far"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="2"
              cy="2"
              r="1"
              fill="#111"
              opacity="0.18"
            />
          </pattern>

          {/* Medium dots */}
          <pattern
            id="dots-mid"
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="2"
              cy="2"
              r="1.2"
              fill="#111"
              opacity="0.28"
            />
          </pattern>

          {/* Dense foreground dots */}
          <pattern
            id="dots-front"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="2"
              cy="2"
              r="1.35"
              fill="#111"
              opacity="0.42"
            />
          </pattern>

          {/* Very dense foreground */}
          <pattern
            id="dots-dense"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="1.5"
              cy="1.5"
              r="1.15"
              fill="#111"
              opacity="0.5"
            />
          </pattern>

          {/* Fade dots toward the bottom */}
          <linearGradient
            id="farFade"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0"
              stopColor="white"
              stopOpacity="1"
            />
            <stop
              offset="0.65"
              stopColor="white"
              stopOpacity="0.8"
            />
            <stop
              offset="1"
              stopColor="white"
              stopOpacity="0"
            />
          </linearGradient>

          <mask id="farMask">
            <rect
              width="1440"
              height="320"
              fill="url(#farFade)"
            />
          </mask>

          <linearGradient
            id="midFade"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0"
              stopColor="white"
              stopOpacity="1"
            />
            <stop
              offset="0.75"
              stopColor="white"
              stopOpacity="0.85"
            />
            <stop
              offset="1"
              stopColor="white"
              stopOpacity="0.15"
            />
          </linearGradient>

          <mask id="midMask">
            <rect
              width="1440"
              height="320"
              fill="url(#midFade)"
            />
          </mask>
        </defs>

        {/* =========================================
            FAR MOUNTAINS
        ========================================= */}

        <path
          d="
            M0 270
            C90 245 130 215 210 225
            C285 235 330 175 405 145
            C445 125 475 100 515 135
            C555 170 585 200 640 185
            C705 168 735 115 785 125
            C850 138 885 190 945 180
            C1015 168 1050 115 1110 135
            C1180 160 1215 205 1280 190
            C1340 177 1385 155 1440 165
            L1440 320
            L0 320
            Z
          "
          fill="url(#dots-far)"
          mask="url(#farMask)"
        />

        {/* =========================================
            MIDDLE MOUNTAIN
        ========================================= */}

        <path
          d="
            M0 295
            C85 275 125 240 195 250
            C255 258 295 215 350 180
            C395 150 420 105 455 120
            C500 140 520 205 575 210
            C625 215 670 160 715 155
            C760 150 790 185 825 205
            C870 230 910 225 955 190
            C1000 155 1025 120 1060 135
            C1100 150 1135 215 1185 225
            C1250 240 1290 205 1340 195
            C1385 187 1415 205 1440 215
            L1440 320
            L0 320
            Z
          "
          fill="url(#dots-mid)"
          mask="url(#midMask)"
        />

        {/* =========================================
            MAIN MOUNTAIN
        ========================================= */}

        <path
          d="
            M0 320

            C100 300 150 275 225 285

            C295 295 340 260 390 220

            C435 185 465 125 505 75

            C525 50 540 42 555 70

            C590 125 605 175 650 205

            C695 235 735 230 780 200

            C825 170 850 135 880 145

            C925 160 950 215 995 240

            C1040 265 1085 245 1130 215

            C1170 190 1195 160 1225 175

            C1265 195 1290 245 1340 260

            C1380 273 1410 270 1440 260

            L1440 320

            Z
          "
          fill="url(#dots-front)"
        />

        {/* =========================================
            FOREGROUND RIDGE
        ========================================= */}

        <path
          d="
            M0 320

            C100 300 170 285 240 295

            C310 305 355 275 405 250

            C455 225 495 210 535 220

            C575 230 600 270 650 275

            C700 280 735 245 775 235

            C820 225 850 245 890 270

            C935 300 980 300 1030 275

            C1080 250 1120 245 1160 260

            C1210 280 1240 305 1300 295

            C1350 287 1390 280 1440 290

            L1440 320

            Z
          "
          fill="url(#dots-dense)"
        />
      </svg>
    </div>
  );
}