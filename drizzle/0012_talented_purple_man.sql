CREATE INDEX "user_id_idx" ON "employees" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "dept_id_idx" ON "employees" USING btree ("department_id");--> statement-breakpoint
CREATE INDEX "pos_id_idx" ON "employees" USING btree ("position_id");--> statement-breakpoint
CREATE INDEX "is_active_idx" ON "employees" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "vac_dept_idx" ON "vacancies" USING btree ("department_id");--> statement-breakpoint
CREATE INDEX "vac_pos_idx" ON "vacancies" USING btree ("position_id");--> statement-breakpoint
CREATE INDEX "vac_active_idx" ON "vacancies" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "vac_created_idx" ON "vacancies" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "vp_vacancy_id_idx" ON "vacancy_periods" USING btree ("vacancy_id");--> statement-breakpoint
CREATE INDEX "vp_date_range_idx" ON "vacancy_periods" USING btree ("start_date","end_date");--> statement-breakpoint
CREATE INDEX "vp_is_active_idx" ON "vacancy_periods" USING btree ("is_active");