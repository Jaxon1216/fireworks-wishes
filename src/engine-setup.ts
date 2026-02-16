import { type Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadTrailEffect } from "@tsparticles/effect-trail";
import { loadDestroyUpdater } from "@tsparticles/updater-destroy";
import { loadLifeUpdater } from "@tsparticles/updater-life";
import { loadRotateUpdater } from "@tsparticles/updater-rotate";

export async function setupEngine(engine: Engine): Promise<void> {
  await loadBasic(engine);

  await Promise.all([
    loadEmittersPlugin(engine),
    loadEmittersShapeSquare(engine),
    loadTrailEffect(engine),
    loadDestroyUpdater(engine),
    loadLifeUpdater(engine),
    loadRotateUpdater(engine),
  ]);
}
