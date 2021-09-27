import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("cars_images")
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;
}

export { CarImage };
