{def $additionalClasses = ezini( 'RteClass', 'RteRootAdditionalClasses', 'owbootstrap.ini')}
	{if $additionalClasses|count}
		<select id="root-additional-classes" name="root-additional-classes" class="span3">
			{foreach $additionalClasses as $id => $label}
				<option value="{$id}">{$label|wash}</option> 
			{/foreach}
		</select>
		{literal}
			<script>
				var current_class = $('#rteBootstrap').attr('data-bsclass');
				$('#root-additional-classes option[value="'+current_class+'"]').prop('selected', true);
				$('#root-additional-classes').change(function() {
					var bs_class = '';
					$("#root-additional-classes option:selected").each(function () {
			          bs_class = $(this).attr('value');
			        });
					$('#rteBootstrap').attr('data-bsclass', bs_class);
				});
			</script>
		{/literal}
	{/if}
{undef}