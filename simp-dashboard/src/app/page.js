"use client";
import { useState } from "react";
import Dropdown from "@/components/Input/Dropdown";
import Grid from "@/components/Grid";
import Box from "@/components/Box";
import Button from "@/components/Button";

export default function Home() {
  const [selectedNodes, setSelectedNodes] = useState([]);

  return (
    <Grid>
      {/* Sensor Monitoring Header */}
      <div className="text-3xl font-bold col-span-12 row-1">Sensor Monitoring</div>
      {/* Box underground metrics */}
      <Box className="row-2 col-span-6 flex justify-center">
        <div className="m-6 w-full max-w-[500px]">
          {/* Header underground overview */}
          <div className="w-full flex items-center place-content-between mb-3">
            <div className="text-2xl uppercase tracking-[3] font-bold text-(--mtr-color-overview)">
              Underground Overview
            </div>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 512 512"
            >
              <path
                fill="var(--mtr-color-overview)"
                transform="translate(383.625, 29.5625)"
                d="M0 0 C0.88 -0.02 1.76 -0.04 2.67 -0.06 C3.49 -0.06 4.31 -0.06 5.16 -0.05 C5.88 -0.06 6.6 -0.06 7.34 -0.06 
       C10.33 0.67 11.52 2.01 13.37 4.43 C13.87 6.97 13.87 6.97 13.87 9.84 C13.87 10.91 13.87 11.97 13.88 13.06 
       C13.85 14.2 13.83 15.33 13.81 16.5 C13.79 18.25 13.79 18.25 13.76 20.04 C13.12 49.73 4.74 79.91 -16.62 101.43 
       C-41 124.55 -74.12 131.06 -106.62 130.43 C-106.96 131.21 -106.96 131.21 -107.31 132 
       C-109.46 135.98 -112.27 139.52 -114.99 143.12 C-120.63 150.81 -121.53 158.00 -120.62 167.43 
       C-118.95 173.5 -115.3 178.68 -112.01 183.99 C-110.09 187.36 -108.85 190.75 -107.62 194.43 
       C-107.19 193.95 -106.77 193.46 -106.33 192.96 C-96.57 182.5 -82.81 174.36 -68.29 173.26 
       C-46.25 172.69 -25.59 176.5 -7.62 190.43 C-5.76 192.21 -5.76 192.21 -4.62 194.43 
       C-4.69 200.28 -6.76 203.99 -10 208.62 C-10.44 209.27 -10.88 209.92 -11.34 210.59 
       C-24.55 229.4 -41.52 243.29 -64.62 247.43 C-82.07 249.04 -96.85 244.01 -112.57 237.23 
       C-114.57 236.45 -116.53 235.9 -118.62 235.43 C-119.44 236.68 -120.25 237.93 -121.06 239.18 
       C-121.51 239.88 -121.96 240.57 -122.43 241.29 C-124.81 245.58 -124.87 249.83 -125.18 254.68 
       C-125.27 255.95 -125.35 257.21 -125.44 258.51 C-125.5 259.47 -125.56 260.44 -125.62 261.43 
       C-124.81 261.17 -124 260.9 -123.16 260.63 C-96.81 252.22 -70.75 253.45 -45.93 266.25 
       C-40.35 269.42 -35.45 273.2 -30.62 277.43 C-29.92 278.04 -29.22 278.64 -28.5 279.26 
       C-19.79 287.33 -13.78 298.03 -10.62 309.43 C-10.62 310.09 -10.62 310.75 -10.62 311.43 
       C-9.75 311.4 -9.75 311.4 -8.87 311.37 C15.02 310.62 36.34 314.51 54.37 331.43 
       C54.99 332 55.61 332.57 56.25 333.15 C59.85 336.83 61.97 340.59 64.04 345.24 
       C67.82 353.66 71.41 357.64 79.25 362.44 C89.63 369.07 95.62 380.67 98.37 392.43 
       C99.44 402.51 99.06 412.3 94.37 421.43 C93.92 422.3 93.48 423.18 93.01 424.07 
       C84.76 438.85 70.85 446.45 55.08 451.48 C48.8 453.01 42.37 452.71 35.94 452.69 
       C34.46 452.7 32.99 452.7 31.52 452.7 C27.49 452.72 23.46 452.71 19.44 452.71 
       C15.09 452.71 10.73 452.72 6.38 452.72 C-2.12 452.74 -10.64 452.74 -19.16 452.73 
       C-26.09 452.73 -33.01 452.73 -39.94 452.74 C-41.42 452.74 -41.42 452.74 -42.93 452.74 
       C-44.93 452.74 -46.94 452.74 -48.94 452.74 C-67.73 452.76 -86.52 452.75 -105.3 452.75 
       C-122.48 452.74 -139.66 452.75 -156.83 452.77 C-174.48 452.79 -192.12 452.8 -209.77 452.8 
       C-219.67 452.79 -229.58 452.8 -239.48 452.81 C-247.91 452.82 -256.34 452.82 -264.78 452.81 
       C-269.08 452.81 -273.37 452.81 -277.67 452.82 C-281.62 452.83 -285.56 452.82 -289.5 452.81 
       C-290.92 452.81 -292.34 452.81 -293.76 452.82 C-310.97 452.91 -325.72 448.92 -338.37 436.78 
       C-348.81 425.89 -353.04 415.22 -352.9 400.14 C-351.85 386.14 -343.96 375.36 -333.62 366.43 
       C-317.16 353.76 -298.31 354.78 -278.62 355.43 C-278.67 354.43 -278.71 353.42 -278.76 352.39 
       C-279.29 335.93 -274.59 322.53 -263.93 309.75 C-248.79 293.7 -228.58 285.71 -206.79 284.96 
       C-192.07 284.8 -178.21 287.8 -164.62 293.43 C-164.16 292.74 -163.7 292.05 -163.22 291.34 
       C-157.51 283.12 -150.92 276.11 -142.62 270.43 C-141.96 270.43 -141.3 270.43 -140.62 270.43 
       C-140.64 269.83 -140.65 269.23 -140.67 268.6 C-141.07 250.96 -140.42 236.97 -128.93 222.81 
       C-123.9 216.44 -122.94 210.12 -123.03 202.11 C-124.08 195.56 -127.32 190.1 -130.54 184.38 
       C-131.7 182.3 -132.8 180.2 -133.89 178.08 C-134.22 177.43 -134.55 176.78 -134.89 176.11 
       C-135.62 174.43 -135.62 174.43 -135.62 172.43 C-136.75 172.47 -137.89 172.52 -139.06 172.56 
       C-164.91 172.44 -191.11 164.95 -210.23 146.98 C-229.12 127.4 -235.86 100.38 -236.12 73.87 
       C-236.14 72.69 -236.16 71.5 -236.18 70.28 C-236.17 69.17 -236.16 68.07 -236.15 66.93 
       C-236.15 65.94 -236.14 64.95 -236.14 63.93 C-235.62 61.43 -235.62 61.43 -233.81 59.61 
       C-230.53 57.84 -227.32 57.99 -223.68 58.06 C-222.9 58.07 -222.11 58.08 -221.3 58.09 
       C-196.7 58.69 -171.71 64.17 -152.62 80.43 C-151.63 81.15 -150.64 81.88 -149.62 82.62 
       C-135.78 94.43 -129.81 112.66 -124.62 129.43 C-118.33 123.01 -117.72 117.36 -117.5 108.62 
       C-116.6 91.13 -113.5 75.55 -106.62 59.43 C-106.17 58.38 -105.72 57.32 -105.25 56.23 
       C-94.68 33.42 -74.8 17.29 -51.62 8.43 C-35.07 2.54 -17.5 0.26 0 0 Z 
       M-74.62 38.43 C-75.37 39.09 -76.11 39.74 -76.88 40.41 C-94.51 56.82 -101.21 82.09 -102.62 105.43 
       C-101.91 104.72 -101.2 104.01 -100.46 103.27 C-97.69 100.5 -94.91 97.74 -92.13 94.98 
       C-90.54 93.4 -88.96 91.82 -87.37 90.24 C-86.29 89.16 -85.21 88.09 -84.13 87.02 
       C-78.76 81.69 -73.46 76.36 -68.54 70.6 C-64.44 65.96 -60.09 61.56 -55.74 57.15 
       C-54.61 56 -53.49 54.84 -52.37 53.67 C-50.74 51.97 -49.09 50.3 -47.43 48.62 
       C-46.93 48.1 -46.44 47.58 -45.93 47.04 C-43.42 44.54 -41.97 43.48 -38.41 43.01 
       C-35.62 43.43 -35.62 43.43 -33.18 45.06 C-31.62 47.43 -31.62 47.43 -31.43 50.18 
       C-34.7 59.12 -44.29 66.18 -50.95 72.72 C-54.39 76.13 -57.77 79.54 -60.92 83.23 
       C-63.94 86.75 -67.16 90.03 -70.45 93.29 C-71.23 94.06 -71.23 94.06 -72.02 94.85 
       C-74.19 96.98 -76.35 99.11 -78.52 101.24 C-80.13 102.81 -81.73 104.39 -83.32 105.98 
       C-83.81 106.45 -84.3 106.92 -84.8 107.41 C-87.61 110.2 -89.74 112.95 -91.62 116.43 
       C-70.46 115.96 -49.03 108.8 -32.62 95.43 C-31.99 94.96 -31.36 94.5 -30.71 94.01 
       C-13.84 80.91 -5.98 57.08 -2.96 36.7 C-2.23 29.63 -1.92 22.53 -1.62 15.43 
       C-26.79 14.21 -55.59 21.14 -74.62 38.43 Z 
       M-221.62 73.43 C-220.9 97.96 -214.47 120.77 -196.62 138.43 C-183.82 150.21 -165.68 155.72 -148.62 156.43 
       C-152.5 151.67 -156.67 147.28 -161 142.93 C-161.52 142.4 -162.05 141.87 -162.6 141.32 
       C-165.41 138.52 -168.28 135.83 -171.28 133.25 C-176.38 128.83 -181.24 124.18 -186.05 119.46 
       C-187.1 118.44 -188.17 117.42 -189.23 116.4 C-190.8 114.92 -192.33 113.41 -193.87 111.9 
       C-194.78 111.02 -195.7 110.14 -196.64 109.23 C-199.13 105.71 -199.13 103.66 -198.62 99.43 
       C-197.06 97.43 -197.06 97.43 -194.62 96.43 C-188.92 96.5 -186.31 98.07 -182.46 101.94 
       C-181.57 102.88 -181.57 102.88 -180.66 103.85 C-179.7 104.82 -179.7 104.82 -178.72 105.81 
       C-176.7 107.88 -174.69 109.97 -172.68 112.06 C-170.68 114.12 -168.66 116.18 -166.65 118.24 
       C-165.4 119.52 -164.16 120.8 -162.92 122.09 C-159.26 125.88 -155.46 129.41 -151.45 132.83 
       C-148.54 135.38 -145.83 138.11 -143.12 140.87 C-142.58 141.41 -142.05 141.95 -141.5 142.51 
       C-140.2 143.81 -138.91 145.12 -137.62 146.43 C-136.27 142.02 -137.23 138.33 -138.25 133.93 
       C-138.43 133.13 -138.61 132.32 -138.8 131.49 C-140.41 124.8 -142.54 118.6 -145.62 112.43 
       C-146.12 111.43 -146.63 110.42 -147.14 109.39 C-156.33 92.39 -171.53 83.06 -189.62 77.43 
       C-198.46 75.19 -207.41 73.26 -216.56 73.37 C-217.52 73.38 -218.47 73.39 -219.46 73.4 
       C-220.53 73.41 -220.53 73.41 -221.62 73.43 Z 
       M-100.62 208.43 C-102.02 210.62 -102.02 210.62 -102.62 212.43 C-96.89 211.82 -91.46 210.78 -85.88 209.37 
       C-84.22 208.96 -82.56 208.55 -80.9 208.15 C-78.32 207.51 -75.74 206.87 -73.17 206.22 
       C-55.47 201.79 -55.47 201.79 -46.62 202.43 C-45.26 209.83 -45.26 209.83 -46.82 212.47 
       C-49.01 214.86 -50.41 215.26 -53.55 215.99 C-54.55 216.23 -55.55 216.47 -56.58 216.72 
       C-57.66 216.96 -58.74 217.2 -59.85 217.45 C-60.96 217.71 -62.06 217.97 -63.2 218.24 
       C-66.73 219.07 -70.27 219.88 -73.81 220.68 C-76.2 221.24 -78.6 221.8 -80.99 222.36 
       C-86.86 223.74 -92.74 225.09 -98.62 226.43 C-95.52 229.9 -92.1 230.63 -87.68 231.62 
       C-86.92 231.79 -86.16 231.96 -85.37 232.14 C-71.27 235.13 -58.42 233.26 -46.15 225.31 
       C-36.64 218.25 -29.34 210.15 -22.62 200.43 C-32.39 192.29 -48.39 188.67 -60.81 188.06 
       C-76.93 189.64 -89.53 196.85 -100.62 208.43 Z 
       M-145.37 291.12 C-149.29 295.62 -152.14 300.51 -154.71 305.87 C-156.25 308.9 -157.21 310.27 -160.4 311.57 
       C-164.58 311.39 -167.45 309.78 -171 307.75 C-188.19 298.61 -207.03 296.48 -225.8 302.12 
       C-240.54 306.99 -251.92 315.26 -260.18 328.5 C-264.23 336.76 -264.98 343.64 -264.68 352.81 
       C-264.62 354.94 -264.57 357.07 -264.53 359.21 C-264.44 360.6 -264.44 360.6 -264.44 362.03 
       C-264.62 364.43 -264.62 364.43 -266.62 367.43 C-269.38 367.83 -269.38 367.83 -272.89 367.87 
       C-274.17 367.9 -275.45 367.93 -276.78 367.95 C-278.14 367.97 -279.51 367.98 -280.87 368 
       C-298.86 368.24 -316.39 368.73 -330.23 381.83 C-336.39 388.91 -339.14 396.19 -338.93 405.56 
       C-337.88 415.29 -332.63 422.3 -325.26 428.38 C-316.82 434.64 -308.1 437.55 -297.59 437.57 
       C-295.77 437.57 -295.77 437.57 -293.91 437.58 C-292.56 437.58 -291.21 437.58 -289.86 437.58 
       C-288.43 437.58 -287 437.59 -285.56 437.59 C-281.62 437.6 -277.68 437.6 -273.74 437.61 
       C-269.49 437.61 -265.24 437.62 -260.99 437.63 C-250.72 437.65 -240.46 437.66 -230.19 437.67 
       C-225.35 437.67 -220.52 437.68 -215.68 437.68 C-199.59 437.7 -183.51 437.71 -167.42 437.72 
       C-163.25 437.72 -159.08 437.73 -154.9 437.73 C-153.35 437.73 -153.35 437.73 -151.76 437.73 
       C-134.97 437.74 -118.17 437.76 -101.38 437.8 C-84.13 437.83 -66.88 437.85 -49.63 437.85 
       C-39.94 437.85 -30.26 437.86 -20.58 437.89 C-12.33 437.91 -4.09 437.92 4.15 437.91 
       C8.36 437.9 12.56 437.9 16.76 437.92 C20.62 437.94 24.48 437.94 28.34 437.92 
       C30.38 437.92 32.41 437.94 34.45 437.95 C48.81 437.85 61.59 434.3 72.43 424.59 
       C79.96 416.69 83.1 408.06 82.89 397.21 C82.59 391.5 81.49 387.2 78.37 382.43 
       C77.88 381.68 77.4 380.92 76.9 380.14 C71.99 373.22 65.64 368.53 58.06 364.81 
       C54.26 361.45 53.43 357.54 51.77 352.83 C46.42 339.87 34.73 332.75 22.37 327.43 
       C12.2 323.67 1.19 322.66 -9.52 324.16 C-11.85 324.46 -14.15 324.61 -16.5 324.68 
       C-17.57 324.72 -17.57 324.72 -18.67 324.76 C-20.62 324.43 -20.62 324.43 -22.3 323.32 
       C-24.17 320.64 -24.41 318.15 -24.93 314.93 C-27.96 299.84 -37.16 288.89 -49.67 280.25 
       C-80.36 261.37 -120.17 264.93 -145.37 291.12 Z"
              />
            </svg>
          </div>
          {/* List of underground metrics */}
          <div className="flex flex-col gap-1">
            {/* AVG. Moisture 20CM */}
            <div className="w-full flex items-center place-content-between">
              <div className="flex items-center gap-[15px]">
                <img
                  src="/Icon-mois-underground-avg.svg"
                  alt="Underground Average Icon"
                  className="w-[30px] h-[30px]"
                />
                <div>Avg. Moisture (20 CM)</div>
              </div>
              <div className="text-xl font-bold text-(--mtr-color-moisture)">
                35 kPa
              </div>
            </div>
            {/* AVG. Moisture 40CM */}
            <div className="w-full flex items-center place-content-between">
              <div className="flex items-center gap-[15px]">
                <img
                  src="/Icon-mois-underground-avg.svg"
                  alt="Underground Average Icon"
                  className="w-[30px] h-[30px]"
                />
                <div>Avg. Moisture (40 CM)</div>
              </div>
              <div className="text-xl font-bold text-(--mtr-color-moisture)">
                35 kPa
              </div>
            </div>
            {/* AVG. Temperature */}
            <div className="w-full flex items-center place-content-between">
              <div className="flex items-center gap-[15px]">
                <img
                  src="/Icon-temp-avg.svg"
                  alt="Underground Average Icon"
                  className="h-[30px] w-[30px]"
                />
                <div>Avg. Temperature</div>
              </div>
              <div className="text-xl font-bold text-(--mtr-color-temperature)">
                35 °C
              </div>
            </div>
          </div>
        </div>
      </Box>
      {/* Box in the box metrics */}
      <Box className="row-2 col-span-6 flex justify-center">
        <div className="m-6 w-full max-w-[500px]">
          {/* Header underground overview */}
          <div className="w-full flex items-center place-content-between mb-3">
            <div className="text-2xl uppercase tracking-[3] font-bold text-(--mtr-color-overview)">
              In the Box Overview
            </div>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 512 512"
            >
              <path
                fill="var(--mtr-color-overview)"
                transform="translate(80.88, 3.86)"
                d="M0 0 C1.89 -0.01 3.82 -0.02 3.82 -0.02 C5.23 -0.02 6.65 -0.02 8.06 -0.02 C12.53 -0.03 24.87 -0.05 38.15 -0.08 
       C70.26 -0.13 135.57 -0.2 151.87 -0.22 C204.38 -0.3 258.24 -0.37 288.5 -0.42 C314.27 -0.45 339.45 -0.48 343.81 -0.49 
       C356.02 -0.61 359.96 2.55 363.25 14.52 C363.26 16.86 363.31 46.0 363.33 62.82 C363.39 103.47 363.46 186.14 363.47 204.71 
       C363.55 271.18 363.63 341.44 363.68 379.74 C363.7 412.36 363.73 429.01 363.73 444.24 C363.75 449.76 363.74 457.25 363.77 459.43 
       C361.95 467.33 358.12 471.14 351.89 472.26 C346.25 472.25 332.95 472.23 307.31 472.21 C288.34 472.19 251.12 472.14 251.12 472.14 
       L251.43 484.26 C251.56 487.72 248.72 500.88 236.67 504.5 C230.9 502.14 228.12 499.14 227.02 488.41 L227.12 472.14 
       L187.12 472.14 L187.57 488.05 C187.68 497.24 184.72 500.88 172.67 504.5 C166.9 502.14 164.12 499.14 163.02 488.41 L163.12 472.14 
       L123.12 472.14 L123.57 488.05 C123.68 497.24 120.72 500.88 108.67 504.5 C102.9 502.14 100.12 499.14 99.02 488.07 L99.12 472.14 
       C82.9 472.27 39.43 472.51 14.2 472.67 C7.69 472.71 1.53 472.76 -9.47 469.73 C-13.19 465.74 -13.02 457.75 -13.03 447.55 
       C-13.07 426.27 -13.15 368.81 -13.22 286.14 C-13.23 267.57 -13.32 201.09 -13.39 130.84 C-13.44 92.53 -13.47 59.91 -13.49 43.26 
       C-13.51 22.51 -13.5 15.02 -13.54 12.85 C-13.44 7.23 -7.88 1.14 0 0 Z 
       M11.12 24.14 L11.12 448.14 L339.12 448.14 L339.12 24.14 L11.12 24.14 Z"
              />

              <path
                fill="var(--mtr-color-overview)"
                transform="translate(148.08, 67.85)"
                d="M0 0 C2.89 -0.01 12.53 -0.04 42.09 -0.12 C82.3 -0.19 92.83 -0.2 126.7 -0.29 C161.48 -0.36 181.01 -0.41 199.38 -0.43 
       C206.12 -0.46 215.32 -0.45 218.03 -0.5 C222.3 -0.44 228.45 0.17 232.07 11.38 C232.1 14.06 232.13 20.12 232.19 30.33 
       C232.27 52.26 232.38 71.3 232.43 85.93 C232.48 92.95 232.5 102.77 232.55 105.7 C232.51 110.15 229.5 116.74 215.83 120.31 
       L212.94 120.32 C203.3 120.35 173.74 120.43 133.53 120.5 C111.71 120.52 89.13 120.59 54.35 120.67 
       C34.83 120.71 16.46 120.74 0.51 120.76 C-2.19 120.8 -12.62 117.74 -16.24 108.93 
       C-16.3 100.19 -16.36 89.98 -16.43 68.04 C-16.55 49.01 -16.64 27.36 -16.67 17.53 
       C-16.72 14.61 -16.68 10.16 -13.67 3.57 C-9.31 -0.5 -5.71 0 0 0 Z 
       M7.92 24.15 L7.92 96.15 L207.92 96.15 L207.92 24.15 L7.92 24.15 Z"
              />

              <path
                fill="var(--mtr-color-overview)"
                transform="translate(258.59, 243.5)"
                d="M0 0 C5.7 2.58 8.41 5.5 9.41 17.5 C8.11 21.38 4.38 28.54 2.83 31.59 
       C-2.09 41.13 -5.41 47.64 -13.59 63.5 L6.59 63.65 C13.45 63.7 23.32 63.79 26.41 63.78 
       C34.37 63.95 38.04 66.92 41.88 78.4 C37.41 90.86 32.23 101.1 27.64 110.18 
       C21.81 121.79 17.3 130.77 10.38 144.46 C4.71 151.9 -0.15 153.16 -11.15 150.13 
       C-14.93 138.34 -9.56 124.46 -8.01 121.41 C-3.09 111.88 0.23 105.36 8.41 89.5 
       L-11.77 89.35 C-18.63 89.3 -28.5 89.21 -31.59 89.22 C-39.55 89.05 -43.22 86.08 -47.05 74.6 
       C-42.59 62.14 -37.41 51.9 -32.82 42.82 C-26.99 31.21 -22.48 22.23 -15.56 8.54 
       C-11.55 2.35 -7.43 -0.36 0 0 Z"
              />

              <path
                fill="var(--mtr-color-overview)"
                transform="translate(149, 260)"
                d="M0 0 C5.39 3.79 7 7 5.95 18.96 C3.56 21.86 1.6 23.8 -2.17 24.27 
       C-13.56 21.63 -17.31 17.59 -17.36 9.55 C-15.0 3.79 -12 1 -8.28 -0.86 L0 0 Z"
              />
            </svg>
          </div>
          {/* List of underground metrics */}
          <div className="flex flex-col gap-1 mb-3">
            {/* AVG. Humidity */}
            <div className="w-full flex items-center place-content-between">
              <div className="flex items-center gap-[15px]">
                <img
                  src="/Icon-mois-avg.svg"
                  alt="Underground Average Icon"
                  className="w-[30px] h-[30px]"
                />
                <div>Avg. Humidity</div>
              </div>
              <div className="text-xl font-bold text-(--mtr-color-moisture)">
                35 %
              </div>
            </div>
            {/* AVG. Temperature */}
            <div className="w-full flex items-center place-content-between">
              <div className="flex items-center gap-[15px]">
                <img
                  src="/Icon-temp-avg.svg"
                  alt="Underground Average Icon"
                  className="h-[30px] w-[30px]"
                />
                <div>Avg. Temperature</div>
              </div>
              <div className="text-xl font-bold text-(--mtr-color-temperature)">
                35 °C
              </div>
            </div>
          </div>
          {/* Battery overview */}
          <div>
            {/* Header battery */}
            <div className="w-full flex items-center place-content-between mb-3">
              <div className="text-xl uppercase tracking-[3] font-bold text-(--mtr-color-overview)">
                Battery
              </div>
              <svg
                width="36"
                height="19"
                viewBox="0 0 36 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="var(--mtr-color-overview)"
                  d="M30 0C32.2091 0 34 1.79086 34 4V6C35.1046 6 36 6.89543 36 8V11C36 12.0357 35.2128 12.887 34.2041 12.9893L34 13V15C34 17.2091 32.2091 19 30 19H4C1.79086 19 1.61066e-08 17.2091 0 15V4C0 1.79086 1.79086 8.0532e-09 4 0H30ZM4 2C2.89543 2 2 2.89543 2 4V15C2 16.1046 2.89543 17 4 17H30C31.1046 17 32 16.1046 32 15V4C32 2.89543 31.1046 2 30 2H4ZM25 15.5H4V3.5H25V15.5Z"
                />
              </svg>
            </div>
            <div>Bar</div>
            <div className="w-full flex items-center gap-[20px]">
              <div className="flex items-center gap-[5px]">
                <div className="w-[10px] h-[10px] bg-(--mtr-color-battery-red) rounded-full"></div>
                <div>&lt;29%:</div>
                <div className="font-bold">1</div>
              </div>
              <div className="flex items-center gap-[5px]">
                <div className="w-[10px] h-[10px] bg-(--mtr-color-battery-yellow) rounded-full"></div>
                <div>30-59%:</div>
                <div className="font-bold">2</div>
              </div>
              <div className="flex items-center gap-[5px]">
                <div className="w-[10px] h-[10px] bg-(--mtr-color-battery-green) rounded-full"></div>
                <div>60-100%:</div>
                <div className="font-bold">3</div>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {/* Map */}
      <Box className="row-3 col-span-8 flex justify-center">
        <div className=""></div>
      </Box>
      {/* Sensor details */}
      <Box className="row-3 col-span-4 flex justify-center">
        <div className="w-full max-w-[500px] my-5 mx-8 flex flex-col gap-3">
          {/* Sensor details content */}
          <div className="flex items-center place-content-between">
            <div>
              <div className="text-xl font-bold">Sensor 1</div>
              <div className="text-sm flex items-center gap-[5px] text-(--mtr-color-overview)">
                <div className="w-[12px] h-[12px] bg-(--mtr-color-online) rounded-full"></div>
                <div>Online</div>
                <div className="w-[4px] h-[4px] bg-(--mtr-color-overview) rounded-full"></div>
                <div>Last updated 2 minutes ago</div>
              </div>
            </div>
            <div>Battery: 80%</div>
          </div>
          {/* Sensor details in the box */}
          <div className="flex flex-col gap-2">
            <div>In the box</div>
            <div className="flex items-center gap-[25px]">
              {/* Humidity */}
              <div className="flex items-center gap-[25px]">
                <img
                  src="/Icon-mois-avg.svg"
                  alt="Underground Average Icon"
                  className="w-[40px] h-[40px]"
                />
                <div>
                  <div className="text-(--mtr-color-overview)">Humidity</div>
                  <div className="text-xl font-bold text-(--mtr-color-moisture)">
                    35 %
                  </div>
                </div>
              </div>
              {/* Temperature */}
              <div className="flex items-center gap-[25px]">
                <img
                  src="/Icon-temp-avg.svg"
                  alt="Underground Average Icon"
                  className="w-[40px] h-[40px]"
                />
                <div>
                  <div className="text-(--mtr-color-overview)">Temperature</div>
                  <div className="text-xl font-bold text-(--mtr-color-temperature)">
                    22 °C
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sensor details underground */}
          <div className="flex flex-col gap-2">
            <div>Underground</div>
            <div className="flex flex-wrap items-center gap-[25px]">
              {/* Moisture 20CM */}
              <div className="flex items-center gap-[25px]">
                <img
                  src="/Icon-mois-underground-avg.svg"
                  alt="Underground Average Icon"
                  className="w-[40px] h-[40px]"
                />
                <div>
                  <div className="text-(--mtr-color-overview)">
                    Moisture 20CM
                  </div>
                  <div className="text-xl font-bold text-(--mtr-color-moisture)">
                    45 kPa
                  </div>
                </div>
              </div>
              {/* Temperature */}
              <div className="flex items-center gap-[25px]">
                <img
                  src="/Icon-temp-avg.svg"
                  alt="Underground Average Icon"
                  className="w-[40px] h-[40px]"
                />
                <div>
                  <div className="text-(--mtr-color-overview)">Temperature</div>
                  <div className="text-xl font-bold text-(--mtr-color-temperature)">
                    22 °C
                  </div>
                </div>
              </div>
              {/* Moisture 40CM */}
              <div className="flex items-center gap-[25px]">
                <img
                  src="/Icon-mois-underground-avg.svg"
                  alt="Underground Average Icon"
                  className="w-[40px] h-[40px]"
                />
                <div>
                  <div className="text-(--mtr-color-overview)">
                    Moisture 40CM
                  </div>
                  <div className="text-xl font-bold text-(--mtr-color-moisture)">
                    45 kPa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {/* Line chart moisture */}
      <Box className="col-span-12 flex justify-center">
        <div className="w-full m-6">
          {/* Head line chart */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <img
                src="/Icon-mois-avg.svg"
                alt="Underground Average Icon"
                className="w-[30px] h-[30px]"
              />
              <div className="text-xl font-bold text-(--mtr-color-moisture)">
                Humidity/Moisture
              </div>
            </div>
            <div>All</div>
            <Dropdown
              lists={["Node A", "Node B", "Node C", "Gateway 1"]}
              value={selectedNodes}
              onChange={setSelectedNodes}
              placeholder="Select Node"
              className="w-40"
            />
          </div>
          {/* Line chart */}
          <div>Line chart</div>
        </div>
      </Box>
      {/* Line chart temperature */}
      <Box className="col-span-12 flex justify-center">
        <div className="w-full m-6">
          {/* Head line chart */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <img
                src="/Icon-temp-avg.svg"
                alt="Underground Average Icon"
                className="w-[30px] h-[30px]"
              />
              <div className="text-xl font-bold text-(--mtr-color-temperature)">
                Temperature
              </div>
            </div>
            <div>All</div>
            <Dropdown
              lists={["Node A", "Node B", "Node C", "Gateway 1"]}
              value={selectedNodes}
              onChange={setSelectedNodes}
              placeholder="Select Node"
              className="w-40"
            />
          </div>
          {/* Line chart */}
          <div>Line chart</div>
        </div>
      </Box>
      {/* Line chart battery */}
      <Box className="col-span-12 flex justify-center">
        <div className="w-full m-6">
          {/* Head line chart */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <img
                src="/Battery-80.svg"
                alt="Underground Average Icon"
                className="w-[30px] h-[30px]"
              />
              <div className="text-xl font-bold text-(--mtr-color-battery-green)">
                Battery Level
              </div>
            </div>
            <div>All</div>
            <Dropdown
              lists={["Node A", "Node B", "Node C", "Gateway 1"]}
              value={selectedNodes}
              onChange={setSelectedNodes}
              placeholder="Select Node"
              className="w-40"
            />
          </div>
          {/* Line chart */}
          <div>Line chart</div>
        </div>
      </Box>
    </Grid>
  );
}
