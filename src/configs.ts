import type { ISourceOptions } from "@tsparticles/engine";

/**
 * 烟花粒子配置（持续发射模式）。
 * 名字通过 DOM 浮层渲染，不使用粒子文本。
 */
export function getFireworksWithNamesConfig(): ISourceOptions {
  return {
    detectRetina: true,
    background: {
      color: "#000011",
    },
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    fpsLimit: 60,
    emitters: {
      direction: "top" as const,
      life: {
        count: 0,
        duration: 0.1,
        delay: 0.1,
      },
      rate: {
        delay: { min: 0.2, max: 0.6 },
        quantity: 1,
      },
      size: {
        width: 100,
        height: 0,
      },
      position: {
        y: 100,
        x: 50,
      },
    },
    particles: {
      number: {
        value: 0,
      },
      color: {
        value: "#fff",
      },
      destroy: {
        mode: "split" as const,
        bounds: {
          top: { min: 10, max: 40 },
        },
        split: {
          sizeOffset: false,
          count: 1,
          factor: {
            value: 0.333333,
          },
          rate: {
            value: { min: 40, max: 70 },
          },
          colorOffset: {
            s: { min: -30, max: 30 },
            l: { min: -15, max: 15 },
          },
          particles: {
            color: {
              value: [
                "#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93",
                "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff8fab",
              ],
            },
            number: {
              value: 0,
            },
            opacity: {
              value: { min: 0.1, max: 1 },
              animation: {
                enable: true,
                speed: 0.8,
                sync: false,
                startValue: "max" as const,
                destroy: "min" as const,
              },
            },
            effect: {
              type: "trail",
              options: {
                trail: {
                  length: { min: 5, max: 10 },
                },
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
              animation: {
                enable: true,
                speed: 5,
                count: 1,
                sync: false,
                startValue: "min" as const,
                destroy: "none" as const,
              },
            },
            life: {
              count: 1,
              duration: {
                value: { min: 0.4, max: 0.8 },
              },
            },
            move: {
              decay: { min: 0.05, max: 0.1 },
              enable: true,
              gravity: {
                enable: true,
                inverse: false,
                acceleration: 10,
              },
              speed: { min: 15, max: 35 },
              direction: "none" as const,
              outModes: "destroy" as const,
            },
          },
        },
      },
      life: {
        count: 1,
      },
      effect: {
        type: "trail",
        options: {
          trail: {
            length: { min: 10, max: 30 },
            minWidth: 1,
            maxWidth: 1,
          },
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 1,
      },
      opacity: {
        value: 0.5,
      },
      rotate: {
        path: true,
      },
      move: {
        enable: true,
        gravity: {
          acceleration: 15,
          enable: true,
          inverse: true,
          maxSpeed: 100,
        },
        speed: { min: 10, max: 20 },
        outModes: {
          default: "destroy" as const,
          top: "none" as const,
        },
      },
    },
  };
}
