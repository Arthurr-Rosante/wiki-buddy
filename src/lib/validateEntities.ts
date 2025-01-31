import { Entity, ResponseObject } from "@/types.commons";

const threshold = 8.0;

const weightRelevance = 0.9;
const weightConfidence = 0.1;

export function validateEntities(entityList: Entity[]) {
  const validEntities = entityList
    .filter((entity) => entity.confidenceScore >= threshold)
    .map((entity) => ({
      ...entity,
      combinedScore:
        (entity.confidenceScore / 10) * weightConfidence + //confidenceScore [0-10]
        entity.relevanceScore * weightRelevance, // relevanceScore [0-1]
    }))
    .sort((a, b) => b.combinedScore - a.combinedScore)
    .reduce((acc, entity) => {
      if (!acc.some((e) => e.entityId === entity.entityId)) {
        acc.push(entity);
      }
      return acc;
    }, [] as ResponseObject["entities"]);

  return validEntities;
}
