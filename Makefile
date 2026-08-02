.PHONY: push

push:
	@read -p "Commit message: " msg; \
	read -p "Branch [main]: " branch; \
	[ -z "$$branch" ] && branch=main; \
	read -p "Pull latest first? (y/n): " pull; \
	if [ "$$pull" = "y" ]; then \
		git pull origin $$branch; \
	fi; \
	git add .; \
	git commit -m "$$msg"; \
	read -p "Push now? (y/n): " push; \
	if [ "$$push" = "y" ]; then \
		git push origin $$branch; \
	else \
		echo "Push cancelled."; \
	fi